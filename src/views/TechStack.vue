<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';
    
    import Tech from '@components/sections/Tech.vue';

    import CreateOrUpdateTechModal from '@components/modals/CreateOrUpdateTechModal.vue';
    import CreateOrUpdateToolModal from '@components/modals/CreateOrUpdateToolModal.vue';

    import type { Tech as TechType, Tool as ToolType } from '@type/entities';

    import { getTools, createTool, updateTool } from '@services/toolService';

    import { getTechs, createTech, updateTech } from '@services/techService';

    const toast = useToast()

    const isTechModal = ref<boolean>(false)
    const isToolModal = ref<boolean>(false)

    const isEditTech = ref<boolean>(false)
    const isEditTool = ref<boolean>(false)  
    
    const tools = ref<ToolType[]>([])
    const techs = ref<TechType[]>([])

    const editTool = ref<ToolType | undefined>()
    const editTech = ref<ToolType | undefined>()

    const handleEditTool = (tool: ToolType) => {
        editTool.value = tool
        isEditTool.value = true
        isToolModal.value = true
    }

    const handleEditTech = (tech: TechType) => {
        editTech.value = tech
        isEditTech.value = true
        isTechModal.value = true
    }

    const fetchData = async () =>{
        try {
            const toolRes = await getTools()
            tools.value = toolRes.data
            toast.success(toolRes.message)
            const techRes = await getTechs()
            techs.value = techRes.data
            toast.success(techRes.message)
        } catch (error:any) {
            toast.error(error.response?.data?.message || "get data fail")
        }
    }

    fetchData()

</script>
<template>
    <div class="tech-container">
        <!-- Tools -->
        <div class="box">
            <div class="box-header">
                <p class="title">Tools</p>
                <button class="btn" @click="{isToolModal = true;isEditTool = false}"> Create new tool</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px;">
                <template v-if="tools && tools.length>0">
                    <Tech 
                        is-tool
                        v-for="tool in tools" 
                        :key="tool.id" 
                        @click="handleEditTool(tool)"
                        :tool="tool"
                    />
                </template>
                <p v-else>Tool is not exists</p>
            </div>
        </div>
        <!-- Techs -->
        <div class="box">
            <div class="box-header">
                <p class="title">Languages and frameworks</p>
                <button class="btn"  @click="{isTechModal = true;  isEditTech = false }" >Create new tech </button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px;">
                <template v-if="techs && techs.length>0">
                    <Tech 
                        v-for="tech in techs" 
                        :key="tech.id" 
                        @click="handleEditTech(tech)"
                        :tech="tech"
                    />
                </template>
                <p v-else>Tech is not exists</p>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <CreateOrUpdateToolModal 
        :tool="editTool" 
        :is-edit="isEditTool" 
        :open="isToolModal" 
        @close="{isToolModal = false; editTool = undefined}"
        v-model="tools"
    />
    <CreateOrUpdateTechModal 
        :tech="editTech" 
        :is-edit="isEditTech" 
        :open="isTechModal" 
        @close="{isTechModal = false; editTech = undefined}"
        v-model="techs"
    />
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