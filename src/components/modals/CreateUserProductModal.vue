<script setup lang="ts">
    import { ref } from 'vue';

    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import Textarea from '@components/ui/textarea/Textarea.vue';

    import type { ProductLink } from '@type/entities';

    const {open = false} = defineProps<{
        open ?: boolean
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const name = ref<string>("")
    const description = ref<string>("")
    const task = ref<string>("")
    const image = ref()
    const start_date = ref<string>("")
    const end_date = ref<string>("")
    const productLinks = ref<ProductLink[]>([{ id:'', title: '', url: '' }])

    const selectedTechIds = ref<string[]>([])

    const techs = [{id:'te1', title : '1', logo :''},{id:'te2', title : '2', logo :''}]

    let techOptions = techs.map(o => ({ key: o.id,value: o.title}))

    const addUrl = () => {
        productLinks.value.push({ id: '', title: '', url: '' })
    }

    const removeUrl = (index: number) => {
        productLinks.value.splice(index, 1)
    }

    const handleSubmit = ()=>{
    }
</script>
<template>
    <BaseModal :open="open" @close="emit('close')">
        <h1 style="text-align: center;">Create Product</h1>
        <Input label="Name" placeholder="E-commerce website" v-model="name"/>
        <Textarea label="Description" placeholder="A website sell ...." v-model="description"/>
        <Input label="Task" placeholder="Fullstack Developer" v-model="task"/>
        <Input label="Image" type="file" v-model="image"/>
        <Input label="Start date" type="date" v-model="start_date"/>
        <Input label="End date" type="date" v-model="end_date"/>
        <h3>Techs of product</h3>
        <Input 
            type="checkbox" 
            v-model="selectedTechIds" 
            label="Techs" 
            :optional-values="techOptions"
        />
        <h3>Urls of product</h3>
        <div v-for="(productLink, index) in productLinks" :key="index">
            <div class="row-header">
                <h4>Url {{ index + 1 }}</h4>
                <button v-if="productLinks.length > 1" @click="removeUrl(index)">Delete</button>
            </div>
            <Input label="Title" placeholder="live Demo" v-model="productLink.title"/>
            <Input label="Link" placeholder="http://..." v-model="productLink.url"/>
        </div>
        <div style="display: flex; justify-content: center">
            <button class="btn" @click="addUrl">Add new button</button>
        </div>
        <div>
            <button class="btn" @click="handleSubmit">Submit</button>
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