<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useToast } from 'vue-toastification';
    
    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';

    import type { Tech as TechType } from '@type/entities';
    import type { FormErrors } from "@type/responses"

    import { createTech, updateTech, deleteTech } from '@services/techService';

    const toast = useToast()

    const props = defineProps<{
        open ?: boolean
        isEditing ?: boolean
        tech ?: TechType
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const techs = defineModel<TechType[]>()

    const isSubmitLoading = ref(false)
    const isDeleteLoading = ref(false)

    const errors = ref<FormErrors>({})

    const currentTech = ref<TechType>({
        id: '',
        name: '',
        icon: ''
    })

    const techForm = ref<{name: string, icon?: File}>({
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
                    name: techForm.value.name
                }
                if(techForm.value.icon){
                    updatePayload.icon = techForm.value.icon
                }
                const res = await updateTech(currentTech.value.id, updatePayload)
            
                const updatedTech = res.data

                const index = techs.value?.findIndex(
                    tech => tech.id === updatedTech.id
                )
                if (
                    index !== undefined &&
                    index !== -1 &&
                    techs.value
                ) {
                    techs.value[index] = updatedTech
                }
                toast.success(res.message)
            }else{
                if (!techForm.value.icon){
                    toast.error("Icon is required")
                    return
                }
                const res = await createTech({
                    name: techForm.value.name,
                    icon: techForm.value.icon
                })
                
                techs.value?.push(res.data)
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
            const res = await deleteTech(currentTech.value.id)

            techs.value = techs.value?.filter(
                tech => tech.id !== currentTech.value.id
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
        () => [props.isEditing, props.tech] as const,
        ([isEditing, tech]) => {
            if (isEditing &&  tech) {
                currentTech.value = { ...tech }
                techForm.value.name = tech.name
                errors.value = {}
            }else {
                currentTech.value = {
                    id: '',
                    name: '',
                    icon: ''
                }
                techForm.value = {
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
        <h1 style="text-align: center;">{{ isEditing ? "Update Tech" : "Create new tech" }}</h1>
        <Input :error="errors?.name?.[0]" label="Name" placeholder="Java" v-model="techForm.name"/>
        <Input :error="errors?.icon?.[0]" label="Icon Image" v-model="techForm.icon" type="file"/>
        <img style="width: 60px; object-fit: contain;" :src="currentTech.icon" alt="">
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