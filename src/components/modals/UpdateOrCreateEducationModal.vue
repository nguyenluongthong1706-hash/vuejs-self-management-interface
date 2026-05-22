<script setup lang="ts">
    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import { ref, watch } from 'vue';
    import { useToast } from 'vue-toastification';

    import type { UserEducation } from '@type/entities';

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

    const educations = defineModel<UserEducation[]>()

    const errors = ref<any>()

    const currentEducation = ref<UserEducation>({
        id: '',
        name: '',
        degree: '',
        startDate: '',
        'endDate': '',
        'userId': ''
    })

    const handleSubmit = async ()=>{
        errors.value = null

        if(props.isEditing){
            try {
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
                emit('close')
            } catch (error: any) {
                errors.value = error.response?.data?.errors
                toast.error(error.response?.data?.message)
            }
        }else{
            try {
                const { id, userId, ...educationPayload } = currentEducation.value 
                const res = await createEducation(educationPayload)
                
                educations.value?.push(res.data)

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
            const res = await deleteEducation(currentEducation.value.id)

            educations.value = educations.value?.filter(
                education => education.id !== currentEducation.value.id
            )

            toast.success(res.message)
            emit('close')
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }
    }

    watch(
        () => [props.isEditing, props.education] as const,
        ([isEditing, education]) => {
            if (isEditing &&  education) {
                currentEducation.value = { ...education }
                errors.value = ""
            }else {
                currentEducation.value = {
                    id: '',
                    name: '',
                    degree: '',
                    startDate:'',
                    endDate:'',
                    userId: ''
                }
                errors.value = ""
            }
        },
        { immediate: true }
    )

</script>
<template>
    <BaseModal :open="open" @close="emit('close')">
        <h1 style="text-align: center;">{{ isEditing ? "Update Education" : "Create Education" }}</h1>
        <Input label="School Name" placeholder="PNV" v-model="currentEducation.name"/>
        <Input label="Degree" placeholder="Information Technology" v-model="currentEducation.degree"/>
        <Input label="Start date" placeholder="11/11/2021" v-model="currentEducation.startDate" type="date"/>
        <Input label="End date" placeholder="11/12/2021" v-model="currentEducation.endDate" type="date"/>
        <div style="display: flex; gap:15px; align-items: center;">
            <button class="btn" @click="handleSubmit">Submit</button>
            <button v-if="isEditing" class="btn" @click="handleDelete">Delete</button>
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