<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useToast } from 'vue-toastification';
    
    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';

    import type { Tool as ToolType } from '@type/entities';

    import { createTool, updateTool, deleteTool } from '@services/toolService';

    const toast = useToast()

    const props = defineProps<{
        open ?: boolean
        isEdit ?: boolean
        tool ?: ToolType
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const toolList = defineModel<ToolType[]>()

    const errors = ref<any>()

    const selectedTool = ref<ToolType>({
        id: '',
        name: '',
        icon: ''
    })

    const toolFormField = ref<{name: string, icon: File | null}>({
        name: '',
        icon: null
    })

    const handleSubmit = async ()=>{
        errors.value = null

        if(props.isEdit){
            
            const updateFormField:{name: string, icon?: File} =  {
                name: toolFormField.value.name
            }
            if(toolFormField.value.icon){
                updateFormField.icon = toolFormField.value.icon
            }
            try {
                const res = await updateTool(selectedTool.value.id, updateFormField)
                
                const updatedTool = res.data

                const index = toolList.value?.findIndex(
                    tool => tool.id === updatedTool.id
                )
                if (
                    index !== undefined &&
                    index !== -1 &&
                    toolList.value
                ) {
                    toolList.value[index] = updatedTool
                }

                toast.success(res.message)
                emit('close')
            } catch (error: any) {
                errors.value = error.response?.data?.errors
                toast.error(error.response?.data?.message)
            }
        }else{
            try {
                const res = await createTool(toolFormField.value)
                
                toolList.value?.push(res.data)
                toast.success(res.message)
                emit('close')
            } catch (error: any) {
                errors.value = error.response?.data?.errors
                toast.error(error.response?.data?.message)
            }
        }
    }

    const handleDelete = async ()=>{
        try {
            const res = await deleteTool(selectedTool.value.id)
            toolList.value = toolList.value?.filter(
                tool => tool.id !== selectedTool.value.id
            )
            toast.success(res.message)
            emit('close')
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }
    }

    watch(
        ()=>[props.isEdit, props.tool] as const,
        ([isEdit, tool]) => {
            if (isEdit && tool) {
                selectedTool.value = { ...tool }
                toolFormField.value.name = tool.name
            }else {
                selectedTool.value = {
                    id: '',
                    name: '',
                    icon: ''
                }
                toolFormField.value = {
                    name: '',
                    icon: null
                }
            }
        },
        { immediate: true }
    )

</script>
<template>
    <BaseModal :open="open" @close="emit('close')">
        <h1 style="text-align: center;">{{ isEdit ? "Update tool" : "Create new tool" }}</h1>
        <Input :error="errors?.name" label="Title" placeholder="Vs Code" v-model="toolFormField.name"/>
        <Input :error="errors?.icon" label="Icon Image" v-model="toolFormField.icon" type="file"/>
        <img style="width: 60px; object-fit: contain;" :src="selectedTool.icon" alt="">
        <div style="display: flex; gap:15px; align-items: center;">
            <button class="btn" @click="handleSubmit">Submit</button>
            <button v-if="isEdit" class="btn" @click="handleDelete">Delete</button>
        </div>
    </BaseModal>
</template>
<style scoped>
    .btn{
        padding:6px 12px;
        margin: 12px 0;
        border-radius: 9px;
        cursor: pointer;
    }
</style>