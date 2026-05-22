<script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { useToast } from 'vue-toastification';

    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';

    import type { UserWorkExperience } from '@type/entities';
    import type { FormErrors } from "@type/responses"

    import { createWorkExperience, updateWorkExperience, deleteWorkExperience } from '@services/workExperienceService';

    const props = defineProps<{
        open ?: boolean
        isEditing ?: boolean
        workExperience ?: UserWorkExperience
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const toast = useToast()

    const isSubmitLoading = ref(false)
    const isDeleteLoading = ref(false)

    const workExperiences = defineModel<UserWorkExperience[]>()

    const errors = ref<FormErrors>()

    const currentWorkExperience = ref<UserWorkExperience>({
        id: '',
        position: '',
        organization: '',
        startDate:'',
        endDate:'',
        userId: ''
    })

    const handleSubmit = async ()=>{
        if (isSubmitLoading.value) return

        try {
            isSubmitLoading.value = true
            errors.value = {}

            if(props.isEditing){
                const { id, userId, ...workExperiencePayload } = currentWorkExperience.value 
                const res = await updateWorkExperience(currentWorkExperience.value.id, workExperiencePayload)
                
                const updatedWorkExperience = res.data

                const index = workExperiences.value?.findIndex(
                    workExperience => workExperience.id === updatedWorkExperience.id
                )
                if (
                    index !== undefined &&
                    index !== -1 &&
                    workExperiences.value
                ) {
                    workExperiences.value[index] = updatedWorkExperience
                }

                toast.success(res.message)
            }else{
                const { id, userId, ...workExperiencePayload } = currentWorkExperience.value 
                const res = await createWorkExperience(workExperiencePayload)
                
                workExperiences.value?.push(res.data)

                toast.success(res.message)
            }
            emit('close')
        } catch (error: any) {
            errors.value = error.response?.data?.errors
            toast.error(error.response?.data?.message)
        }finally{
            isSubmitLoading.value = false
        }
    }

    const handleDelete = async ()=>{
        if (isDeleteLoading.value) return

        try {
            isDeleteLoading.value = true

            const res = await deleteWorkExperience(currentWorkExperience.value.id)

            workExperiences.value = workExperiences.value?.filter(
                workExperience => workExperience.id !== currentWorkExperience.value.id
            )

            toast.success(res.message)
            emit('close')
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }finally{
            isDeleteLoading.value = false
        }
    }

    watch(
        () => [props.isEditing, props.workExperience] as const,
        ([isEditing, workExperience]) => {
            if (isEditing &&  workExperience) {
                currentWorkExperience.value = { ...workExperience }
                errors.value = {}
            }else {
                currentWorkExperience.value = {
                    id: '',
                    position: '',
                    organization: '',
                    startDate: '',
                    endDate: '',
                    userId: ''
                }
                errors.value = {}
            }
        },
        { immediate: true }
    )

</script>
<template>
    <BaseModal :open="open" @close="emit('close')">
        <h1 style="text-align: center;">{{ isEditing ? "Update Work Experience" : "Create Work Experience" }}</h1>
        <Input :error="errors?.position?.[0]" label="Position" placeholder="Backend developer" v-model="currentWorkExperience.position"/>
        <Input :error="errors?.organization?.[0]" label="Organization" placeholder="Hodford" v-model="currentWorkExperience.organization"/>
        <Input :error="errors?.startDate?.[0]" label="Start date" placeholder="11/11/2021" v-model="currentWorkExperience.startDate" type="date"/>
        <Input :error="errors?.endDate?.[0]" label="End date" placeholder="11/12/2021" v-model="currentWorkExperience.endDate" type="date"/>
        <div style="display: flex; gap:15px; align-items: center;">
            <button class="btn" :disabled="isSubmitLoading" @click="handleSubmit">
                {{ isSubmitLoading ? "Loading..." : "Submit" }}
            </button>
            <button v-if="isEditing" :disabled="isDeleteLoading" class="btn" @click="handleDelete">
                {{ isDeleteLoading ? "Deleting..." : "Delete" }}
            </button>
        </div>
    </BaseModal>
</template>
<style scoped>
    .btn{
        padding:6px 12px;
        border-radius: 9px;
        cursor: pointer;
    }
</style>