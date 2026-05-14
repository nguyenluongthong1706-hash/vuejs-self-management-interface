<script setup lang="ts">
    import { ref, computed, watch } from 'vue';

    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import Textarea from '@components/ui/textarea/Textarea.vue';
    import Tech from '@components/sections/Tech.vue';

    import type { UserProduct, ProductUrl } from '@type/entities';

    const {open = false, userProduct} = defineProps<{
        open ?: boolean
        userProduct : UserProduct
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const isTechForm = ref<boolean>(false)
    const isUrlForm = ref<boolean>(false)

    const name = ref<string>(userProduct.name)
    const description = ref<string>(userProduct.description)
    const task = ref<string>(userProduct.task)
    const image = ref()
    const start_date = ref<Date>( userProduct.start_date)
    const end_date = ref<Date>( userProduct.end_date)
    const productUrls = ref<ProductUrl[]>(userProduct.product_urls)
    const productTechs = ref(userProduct.product_techs)
    const newProductUrls = ref({title:'', link:''})

    const imageLink = ref(userProduct.image)
    const selectedTechs = ref(userProduct.product_techs.map(item => item.tech_id))

    const techs = [{id:'te1', title : '1', logo :''},{id:'te2', title : '2', logo :''},{id:'te3', title : '2', logo :''}]

    let optionalValues = techs.map(o => ({ key: o.id,value: o.title, disabled: selectedTechs.value.some(item => item == o.id)}))

    const handleSubmit = ()=>{
    }

    watch(
        ()=>userProduct,
        (newProduct)=>{
            if(newProduct){
                name.value = newProduct.name
                description.value = newProduct.description
                task.value = newProduct.task
                imageLink.value = newProduct.image
                start_date.value = newProduct.start_date
                end_date.value = newProduct.end_date
                productUrls.value = newProduct.product_urls
                productTechs.value = newProduct.product_techs
                selectedTechs.value = newProduct.product_techs.map(item => item.tech_id)
            }
        }
    )
</script>
<template>
    <BaseModal :open="open" @close="emit('close')" style="width: 80vh!important;">
        <h1 style="text-align: center;">Product</h1>
        <!-- Basic Information of product -->
        <Input label="Name" placeholder="E-commerce website" v-model="name"/>
        <Textarea label="Description" placeholder="A website sell ...." v-model="description"/>
        <Input label="Task" placeholder="Fullstack Developer" v-model="task"/>
        <Input label="Image" type="file" v-model="image"/>
        <Input label="Start date" type="date" v-model="start_date"/>
        <Input label="End date" type="date" v-model="end_date"/>
        <div>
            <button class="btn" @click="handleSubmit">Edit product</button>
        </div>
        <!-- Tech of Product -->
        <div class="section">
            <div class="section-header">
                <h3>Techs of product</h3>
                <button class="btn" @click="isTechForm = !isTechForm">Assign Tech</button>
            </div>
            <div class="form" v-if="isTechForm">
                <div style="max-height: 210px; overflow-y: auto;">
                    <Input 
                        type="checkbox" 
                        v-model="selectedTechs" 
                        label="Techs" 
                        :optional-values="optionalValues"
                    />
                </div>
                <button class="btn">Assign</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px; margin: 6px 0;">
                <Tech v-for="tech in productTechs" size="small" />
            </div>
        </div>
        <!-- Url of product -->
        <div class="section">
            <div class="section-header">
                <h3>Urls of product</h3>
                <button class="btn" @click="isUrlForm = !isUrlForm">Add new url</button>
            </div>
            <div class="form" v-if="isUrlForm">
                <Input label="Title" placeholder="live Demo" v-model="newProductUrls.title"/>
                <Input label="Link" placeholder="http://..." v-model="newProductUrls.link"/>
                <button class="btn">Add new</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px; margin: 6px 0;">
                <div class="item" v-for="(item, index) in productUrls" :key="index">
                    <div class="row-header">
                        <h4>Url {{ index + 1 }}</h4>
                        <button>Delete</button>
                    </div>
                    <Input label="Title" placeholder="live Demo" v-model="item.title"/>
                    <Input label="Link" placeholder="http://..." v-model="item.link"/>
                </div>
            </div>
        </div>
    </BaseModal>
</template>
<style scoped>
    .btn{
        padding:6px 12px;
        margin: 12px 0px;
        border-radius: 9px;
        cursor: pointer;
    }
    .row-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .section{
        margin: 12px 0;;
    }
    .section-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 12px 0;
    }
    .form{
        padding: 6px 12px;
        margin: 12px 0;
        border: 1px solid gray;
        border-radius: 9px;
    }
    .item{
        padding: 6px 12px;
        box-shadow: 0px 0px 1px;
        border-radius: 9px;
    }
</style>