<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useToast } from 'vue-toastification';
    
    import Tech from '@components/sections/Tech.vue';

    import CreateOrUpdateTechModal from '@components/modals/CreateOrUpdateTechModal.vue';
    import CreateOrUpdateToolModal from '@components/modals/CreateOrUpdateToolModal.vue';

    import type { Tech as TechType, Tool as ToolType } from '@type/entities';

    import { getTools } from '@services/toolService';

    import { getTechs } from '@services/techService';

    const toast = useToast()

    const showTechModal = ref<boolean>(false)
    const showToolModal = ref<boolean>(false)

    const isEditingTech = ref<boolean>(false)
    const isEditingTool = ref<boolean>(false)  
    
    const tools = ref<ToolType[]>([])
    const techs = ref<TechType[]>([])

    const editingTool = ref<ToolType | undefined>()
    const editingTech = ref<TechType | undefined>()

    const handleEditTool = (tool: ToolType) => {
        editingTool.value = tool
        isEditingTool.value = true
        showToolModal.value = true
    }

    const handleEditTech = (tech: TechType) => {
        editingTech.value = tech
        isEditingTech.value = true
        showTechModal.value = true
    }

    const fetchTechnologies = async () =>{
        try {
            const [toolRes, techRes] = await Promise.all([
                await getTools(),
                await getTechs()
            ])
            tools.value = toolRes.data
            techs.value = techRes.data
        } catch (error:any) {
            toast.error(error.response?.data?.message || "get data fail")
        }
    }

    onMounted(fetchTechnologies)

</script>
<template>
    <div class="technology-container">
        <!-- Tools -->
        <div class="section-card">
            <div class="section-header">
                <p class="section-title">Tools</p>
                <button class="btn" @click="{showToolModal = true;isEditingTool = false}"> Create new tool</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px;">
                <template v-if="tools && tools.length>0">
                    <Tech 
                        is-tool
                        v-for="tool in tools" 
                        :key="tool.id" 
                        @click="handleEditTool(tool)"
                        :item="tool"
                    />
                </template>
                <p v-else>Tools do not exist</p>
            </div>
        </div>
        <!-- Techs -->
        <div class="section-card">
            <div class="section-header">
                <p class="section-title">Languages and frameworks</p>
                <button class="btn"  @click="{showTechModal = true;  isEditingTech = false }" >Create new tech </button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px;">
                <template v-if="techs && techs.length>0">
                    <Tech 
                        v-for="tech in techs" 
                        :key="tech.id" 
                        @click="handleEditTech(tech)"
                        :item="tech"
                    />
                </template>
                <p v-else>Techs do not exist</p>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <CreateOrUpdateToolModal 
        :open="showToolModal" 
        :is-editing="isEditingTool" 
        @close="{showToolModal = false; editingTool = undefined}"
        v-model="tools"
        :tool="editingTool" 
    />
    <CreateOrUpdateTechModal 
        :open="showTechModal" 
        :is-editing="isEditingTech" 
        @close="{showTechModal = false; editingTech = undefined}"
        v-model="techs"
        :tech="editingTech" 
    />
    <!--  -->
</template>
<style scoped>
    .technology-container{
        min-height: 100%;
        padding: 12px 21px;
        background-color: rgb(245, 245, 245);
    }
    .section-card{
        margin: 24px 0;
        padding: 12px 24px;
        background-color: white;
        border-radius: 9px;
    }
    .section-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .section-title{
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