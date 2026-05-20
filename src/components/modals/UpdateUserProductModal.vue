<script setup lang="ts">
    import { ref, watch } from 'vue';

    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import Textarea from '@components/ui/textarea/Textarea.vue';
    import Tech from '@components/sections/Tech.vue';

    import type { UserProduct, ProductLink } from '@type/entities';

    const {open = false, product} = defineProps<{
        open ?: boolean
        product : UserProduct
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const showTechForm = ref<boolean>(false)
    const showUrlForm = ref<boolean>(false)

    const name = ref<string>(product.name)
    const description = ref<string>(product.description)
    const task = ref<string>(product.task)
    const image = ref()
    const startDate = ref<string>( product.startDate)
    const endDate = ref<string>( product.endDate)
    const productLinks = ref<ProductLink[]>(product.productLinks)
    const productTechs = ref(product.productTechs)
    const newProductLink = ref({title:'', link:''})

    const imageUrl = ref(product.image)
    const selectedTechIds = ref(product.productTechs.map(productTech  => productTech .techId))

    const techs = [{id:'te1', title : '1', logo :''},{id:'te2', title : '2', logo :''},{id:'te3', title : '2', logo :''}]

    let techOptions = techs.map(tech => ({ key: tech.id,value: tech.title, disabled: selectedTechIds.value.some(valueId => valueId == tech.id)}))

    const handleSubmit = ()=>{
    }

    watch(
        ()=>product,
        (newProduct)=>{
            if(newProduct){
                name.value = newProduct.name
                description.value = newProduct.description
                task.value = newProduct.task
                imageUrl.value = newProduct.image
                startDate.value = newProduct.startDate
                endDate.value = newProduct.endDate
                productLinks.value = newProduct.productLinks
                productTechs.value = newProduct.productTechs
                selectedTechIds.value = newProduct.productTechs.map(productTech => productTech.techId)
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
        <Input label="Start date" type="date" v-model="startDate"/>
        <Input label="End date" type="date" v-model="endDate"/>
        <div>
            <button class="btn" @click="handleSubmit">Edit product</button>
        </div>
        <!-- Tech of Product -->
        <div class="section">
            <div class="section-header">
                <h3>Techs of product</h3>
                <button class="btn" @click="showTechForm = !showTechForm">Assign Tech</button>
            </div>
            <div class="section-form" v-if="showTechForm">
                <div style="max-height: 210px; overflow-y: auto;">
                    <Input 
                        type="checkbox" 
                        v-model="selectedTechIds" 
                        label="Techs" 
                        :optional-values="techOptions"
                    />
                </div>
                <button class="btn">Assign</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px; margin: 6px 0;">
                <Tech v-for="tech in productTechs" size="small" />
            </div>
        </div>
        <!-- Url of product -->
        <div class="product-section">
            <div class="section-header">
                <h3>Urls of product</h3>
                <button class="btn" @click="showUrlForm = !showUrlForm">Add new url</button>
            </div>
            <div class="section-form" v-if="showUrlForm">
                <Input label="Title" placeholder="live Demo" v-model="newProductLink.title"/>
                <Input label="Link" placeholder="http://..." v-model="newProductLink.link"/>
                <button class="btn">Add new</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px; margin: 6px 0;">
                <div class="url-item" v-for="(productLink, index) in productLinks" :key="index">
                    <div class="row-header">
                        <h4>Url {{ index + 1 }}</h4>
                        <button>Delete</button>
                    </div>
                    <Input label="Title" placeholder="live Demo" v-model="productLink.title"/>
                    <Input label="Link" placeholder="http://..." v-model="productLink.url"/>
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
    .product-section{
        margin: 12px 0;;
    }
    .section-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 12px 0;
    }
    .section-form{
        padding: 6px 12px;
        margin: 12px 0;
        border: 1px solid gray;
        border-radius: 9px;
    }
    .url-item{
        padding: 6px 12px;
        box-shadow: 0px 0px 1px;
        border-radius: 9px;
    }
</style>