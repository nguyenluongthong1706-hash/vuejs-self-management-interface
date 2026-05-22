<script setup lang="ts">
    import { ref, computed, watch, onMounted } from 'vue';
    import { useToast } from 'vue-toastification';

    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import Textarea from '@components/ui/textarea/Textarea.vue';

    import type { Tech, UserProduct } from '@type/entities';
    import type { FormErrors } from "@type/responses"
    import type { CreateProductRequest } from '@type/requests'

    import { getTechs } from '@services/techService';
    import { createProduct } from '@services/productService';

    const toast = useToast()

    const products = defineModel<UserProduct[]>('products',{default: []})

    const props = defineProps<{
        open ?: boolean
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const isSubmitLoading = ref(false)
    const errors = ref<FormErrors>()
        
    const productForm =  ref<{
        name: string
        description: string
        task: string
        image?: File
        startDate: string
        endDate: string
        links: {title:string, url: string}[]
        techs: {techId: string}[]
    }>({
        name : '',
        description: '',
        task: '',
        image: undefined,
        startDate: '',
        endDate:'',
        links: [{ title: '', url: '' }],
        techs:[]
    })

    const selectedTechIds = ref<string[]>([])

    const techs = ref<Tech[]>([])

    const techOptions = computed< {key: string; value: string}[]>(()=>{
        return techs.value.map(tech => ({ key: tech.id,value: tech.name}))
    })

    const addUrl = () => {
        productForm.value.links.push({ title: '', url: '' })
    }

    const removeLink = (index: number) => {
        productForm.value.links.splice(index, 1)
    }

    const handleSubmit = async ()=>{
        if (isSubmitLoading.value) return

        const image = productForm.value.image

        if (!image) {
            toast.error("Image is required")
            return
        }
        try {
            isSubmitLoading.value = true
            const payload: CreateProductRequest = {
                ...productForm.value,
                image,
                techs : selectedTechIds.value.map(id => ({
                    techId: id
                }))
            }
            const res = await createProduct(payload)

            products.value.push(res.data)
            toast.success(res.message)

            emit('close')
        } catch (err:any) {
            errors.value = err.response?.data?.errors
            toast.error(err.response?.data?.message)
        }finally {
            isSubmitLoading.value = false
        }
    }

    const fetchTechs = async () => {
        try {
            const res = await getTechs();

            techs.value = res.data
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Get techs fail")
        }
    }

    onMounted(fetchTechs)

    watch(
        ()=>props.open,
        (newOpen)=>{
            if(newOpen){
                productForm.value.name = ''
                productForm.value.description= ''
                productForm.value.task= ''
                productForm.value.image= undefined
                productForm.value.startDate= ''
                productForm.value.endDate=''
                productForm.value.links= [{ title: '', url: '' }]
                productForm.value.techs=[]

                errors.value = {}
            }
        },
        { immediate: true }
    )
</script>
<template>
    <BaseModal :open="open" @close="emit('close')">
        <h1 style="text-align: center;">Create Product</h1>
        <Input :error="errors?.name?.[0]" label="Name" placeholder="E-commerce website" v-model="productForm.name"/>
        <Textarea :error="errors?.description?.[0]"  label="Description" placeholder="A website sell ...." v-model="productForm.description"/>
        <Input :error="errors?.task?.[0]"  label="Task" placeholder="Fullstack Developer" v-model="productForm.task"/>
        <Input :error="errors?.image?.[0]"  label="Image" type="file" v-model="productForm.image"/>
        <Input :error="errors?.startDate?.[0]"  label="Start date" type="date" v-model="productForm.startDate"/>
        <Input :error="errors?.endDate?.[0]"  label="End date" type="date" v-model="productForm.endDate"/>
        <h3>Techs of product</h3>
        <Input 
            :error="errors?.techs?.[0]" 
            type="checkbox" 
            v-model="selectedTechIds" 
            label="Techs" 
            :options="techOptions"
        />
        <h3>Links of product</h3>
        <div v-for="(productLink, index) in productForm.links" :key="index">
            <div class="row-header">
                <h4>Link {{ index + 1 }}</h4>
                <button v-if="productForm.links.length > 1" @click="removeLink(index)">Delete</button>
            </div>
            <Input :error="errors?.[`links.${index}.title`]?.[0]"  label="Title" placeholder="live Demo" v-model="productLink.title"/>
            <Input :error="errors?.[`links.${index}.url`]?.[0]"  label="Link" placeholder="http://..." v-model="productLink.url"/>
        </div>
        <div style="display: flex; justify-content: center">
            <button class="btn" @click="addUrl">Add new button</button>
        </div>
        <div>
            <button class="btn" :disabled="isSubmitLoading" @click="handleSubmit">
                {{ isSubmitLoading ? "Loading..." : "Submit" }}
            </button>
        </div>
    </BaseModal>
</template>
<style scoped>
    .btn{
        padding:6px 12px;
        border-radius: 9px;
        cursor: pointer;
    }
    .row-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>