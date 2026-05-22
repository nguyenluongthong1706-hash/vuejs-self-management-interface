<script setup lang="ts">
    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import { ref, watch } from 'vue';
    import { useToast } from 'vue-toastification';

    import type { UserEducation } from '@type/entities';
    import type { FormErrors } from "@type/responses"

    import { createEducation, updateEducation, deleteEducation } from '@services/educationService';

    const props = defineProps<{
        open ?: boolean
        isEditing ?: boolean
        education ?: UserEducation
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const toast = useToast()

    const isSubmitLoading = ref(false)
    const isDeleteLoading = ref(false)

    const educations = defineModel<UserEducation[]>()

    const errors = ref<FormErrors>()

    const currentEducation = ref<UserEducation>({
        id: '',
        name: '',
        degree: '',
        startDate: '',
        'endDate': '',
        'userId': ''
    })

    const handleSubmit = async ()=>{
        if (isSubmitLoading.value) return

        try {
            isSubmitLoading.value = true
            errors.value = {}

            if(props.isEditing){
                const { id, userId, ...educationPayload } = currentEducation.value 
                const res = await updateEducation(currentEducation.value.id, educationPayload)
                
                const updatedEducation = res.data

                const index = educations.value?.findIndex(
                    education => education.id === updatedEducation.id
                )
                if (
                    index !== undefined &&
                    index !== -1 &&
                    educations.value
                ) {
                    educations.value[index] = updatedEducation
                }

                toast.success(res.message)
            }else{
                const { id, userId, ...educationPayload } = currentEducation.value 
                const res = await createEducation(educationPayload)
                
                educations.value?.push(res.data)

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

            const res = await deleteEducation(currentEducation.value.id)

            educations.value = educations.value?.filter(
                education => education.id !== currentEducation.value.id
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
        () => [props.isEditing, props.education] as const,
        ([isEditing, education]) => {
            if (isEditing &&  education) {
                currentEducation.value = { ...education }
                errors.value = {}
            }else {
                currentEducation.value = {
                    id: '',
                    name: '',
                    degree: '',
                    startDate:'',
                    endDate:'',
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
        <h1 style="text-align: center;">{{ isEditing ? "Update Education" : "Create Education" }}</h1>
        <Input :error="errors?.name?.[0]" label="School Name" placeholder="PNV" v-model="currentEducation.name"/>
        <Input :error="errors?.degree?.[0]" label="Degree" placeholder="Information Technology" v-model="currentEducation.degree"/>
        <Input :error="errors?.startDate?.[0]" label="Start date" placeholder="11/11/2021" v-model="currentEducation.startDate" type="date"/>
        <Input :error="errors?.endDate?.[0]" label="End date" placeholder="11/12/2021" v-model="currentEducation.endDate" type="date"/>
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