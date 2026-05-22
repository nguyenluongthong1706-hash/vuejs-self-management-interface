<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useToast } from 'vue-toastification';
    
    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';

    import type { Tool as ToolType } from '@type/entities';
    import type { FormErrors } from "@type/responses"

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

    const isSubmitLoading = ref(false)
    const isDeleteLoading = ref(false)

    const errors = ref<FormErrors>()

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
        if (isSubmitLoading.value) return

        try {
            isSubmitLoading.value = true
            errors.value = {}

            if(props.isEditing){
                const updatePayload:{name: string, icon?: File} =  {
                    name: toolForm.value.name
                }
                if(toolForm.value.icon){
                    updatePayload.icon = toolForm.value.icon
                }
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
            }else{
                if (!toolForm.value.icon){
                    toast.error("Icon is required")
                    return
                }
                const res = await createTool({
                    name: toolForm.value.name,
                    icon: toolForm.value.icon
                })
                
                tools.value?.push(res.data)
                toast.success(res.message)
            }
            emit('close')
        } catch (error: any) {
            errors.value = error.response?.data?.errors
            toast.error(error.response?.data?.message)
        }finally {
            isSubmitLoading.value = false
        }
    }

    const handleDelete = async ()=>{
        if (isDeleteLoading.value) return

        try {
            isDeleteLoading.value = true
            const res = await deleteTool(currentTool.value.id)
            tools .value = tools .value?.filter(
                tool => tool.id !== currentTool.value.id
            )
            toast.success(res.message)
            emit('close')
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }finally {
            isDeleteLoading.value = false
        }
    }

    watch(
        ()=>[props.isEditing, props.tool] as const,
        ([isEditing, tool]) => {
            if (isEditing && tool) {
                currentTool.value = { ...tool }
                toolForm.value.name = tool.name
                errors.value = {}
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
                errors.value = {}
            }
        },
        { immediate: true }
    )

</script>
<template>
    <BaseModal :open="open" @close="emit('close')">
        <h1 style="text-align: center;">{{ isEditing ? "Update tool" : "Create new tool" }}</h1>
        <Input :error="errors?.name?.[0]" label="Title" placeholder="Vs Code" v-model="toolForm.name"/>
        <Input :error="errors?.icon?.[0]" label="Icon Image" v-model="toolForm.icon" type="file"/>
        <img style="width: 60px; object-fit: contain;" :src="currentTool.icon" alt="">
        <div style="display: flex; gap:15px; align-items: center;">
            <button class="btn" :disabled="isSubmitLoading" @click="handleSubmit">
                 {{ isSubmitLoading ? "Loading..." : "Submit" }}
            </button>
            <button v-if="isEditing" class="btn" :disabled="isDeleteLoading" @click="handleDelete">
                 {{ isDeleteLoading ? "Deleting..." : "Delete" }}
            </button>
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