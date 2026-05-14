<script setup lang="ts">
    import { ref } from 'vue';
    
    import Tech from '@components/sections/Tech.vue';

    import CreateOrUpdateTechModal from '@components/modals/CreateOrUpdateTechModal.vue';
    import CreateOrUpdateToolModal from '@components/modals/CreateOrUpdateToolModal.vue';

    const isTechModal = ref<boolean>(false)
    const isToolModal = ref<boolean>(false)

    const isEditTech = ref<boolean>(false)
    const isEditTool = ref<boolean>(false)        

</script>
<template>
    <div class="tech-container">
        <div class="box">
            <div class="box-header">
                <p class="title">Tools</p>
                <button class="btn" @click="{isToolModal = true;isEditTool = false}"> Create new tool</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px;">
                <Tech is-tool @click="{isToolModal = true; isEditTool = true}"/>
            </div>
        </div>
        <div class="box">
            <div class="box-header">
                <p class="title">Languages and frameworks</p>
                <button class="btn"  @click="{isTechModal = true;  isEditTech = false }" >Create new tech </button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px;">
                <Tech @click="{isTechModal = true; isEditTech = true}"/>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <CreateOrUpdateToolModal :is-edit="isEditTool" :open="isToolModal" @close="isToolModal = false"/>
    <CreateOrUpdateTechModal :is-edit="isEditTech" :open="isTechModal" @close="isTechModal = false"/>
    <!--  -->
</template>
<style scoped>
    .tech-container{
        min-height: 100%;
        padding: 12px 21px;
        background-color: rgb(245, 245, 245);
    }
    .box{
        margin: 24px 0;
        padding: 12px 24px;
        background-color: white;
        border-radius: 9px;
    }
    .box-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title{
        font-size: 27px;
        font-weight: bold;
        margin-bottom: 18px;
    }
    .btn{
        padding: 9px 27px;
        border-radius: 9px;
        margin: 12px 0;
        cursor: pointer;
    }
</style>