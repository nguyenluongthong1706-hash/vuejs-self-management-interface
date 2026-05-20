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
        isEditing ?: boolean
        tool ?: ToolType
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const tools  = defineModel<ToolType[]>()

    const errors = ref<any>()

    const currentTool = ref<ToolType>({
        id: '',
        name: '',
        icon: ''
    })

    const toolForm = ref<{name: string, icon?: File}>({
        name: '',
        icon: undefined
    })

    const handleSubmit = async ()=>{
        errors.value = null

        if(props.isEditing){
            
            const updatePayload:{name: string, icon?: File} =  {
                name: toolForm.value.name
            }
            if(toolForm.value.icon){
                updatePayload.icon = toolForm.value.icon
            }
            try {
                const res = await updateTool(currentTool.value.id, updatePayload)
                
                const updatedTool = res.data

                const index = tools .value?.findIndex(
                    tool => tool.id === updatedTool.id
                )
                if (
                    index !== undefined &&
                    index !== -1 &&
                    tools .value
                ) {
                    tools .value[index] = updatedTool
                }

                toast.success(res.message)
                emit('close')
            } catch (error: any) {
                errors.value = error.response?.data?.errors
                toast.error(error.response?.data?.message)
            }
        }else{
            try {
                if (!toolForm.value.icon) return
                const res = await createTool({
                    name: toolForm.value.name,
                    icon: toolForm.value.icon
                })
                
                tools .value?.push(res.data)
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
            const res = await deleteTool(currentTool.value.id)
            tools .value = tools .value?.filter(
                tool => tool.id !== currentTool.value.id
            )
            toast.success(res.message)
            emit('close')
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }
    }

    watch(
        ()=>[props.isEditing, props.tool] as const,
        ([isEditing, tool]) => {
            if (isEditing && tool) {
                currentTool.value = { ...tool }
                toolForm.value.name = tool.name
            }else {
                currentTool.value = {
                    id: '',
                    name: '',
                    icon: ''
                }
                toolForm.value = {
                    name: '',
                    icon: undefined
                }
            }
        },
        { immediate: true }
    )

</script>
<template>
    <BaseModal :open="open" @close="emit('close')">
        <h1 style="text-align: center;">{{ isEditing ? "Update tool" : "Create new tool" }}</h1>
        <Input :error="errors?.name" label="Title" placeholder="Vs Code" v-model="toolForm.name"/>
        <Input :error="errors?.icon" label="Icon Image" v-model="toolForm.icon" type="file"/>
        <img style="width: 60px; object-fit: contain;" :src="currentTool.icon" alt="">
        <div style="display: flex; gap:15px; align-items: center;">
            <button class="btn" @click="handleSubmit">Submit</button>
            <button v-if="isEditing" class="btn" @click="handleDelete">Delete</button>
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