<script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { useToast } from 'vue-toastification';

    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';

    import type { UserWorkExperience } from '@type/entities';

    import { createWorkExperience, updateWorkExperience, deleteWorkExperience } from '@services/workExperienceService';

    const props = defineProps<{
        open ?: boolean
        isEdit ?: boolean
        userWorkExperience ?: UserWorkExperience
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const toast = useToast()

    const workExperienceList = defineModel<UserWorkExperience[]>()

    const errors = ref<any>()

    const selectedWorkExperience = ref<UserWorkExperience>({
        id: '',
        position: '',
        place_at: '',
        start_date: new Date(),
        'end_date': new Date(),
        'user_id': ''
    })

    const handleSubmit = async ()=>{
        errors.value = null

        if(props.isEdit){
            try {
                const { id, user_id, ...rest } = selectedWorkExperience.value 
                const res = await updateWorkExperience(selectedWorkExperience.value.id, rest)
                
                const updatedTech = res.data

                const index = workExperienceList.value?.findIndex(
                    workExperience => workExperience.id === updatedTech.id
                )
                if (
                    index !== undefined &&
                    index !== -1 &&
                    workExperienceList.value
                ) {
                    workExperienceList.value[index] = updatedTech
                }

                toast.success(res.message)
                emit('close')
            } catch (error: any) {
                errors.value = error.response?.data?.errors
                toast.error(error.response?.data?.message)
            }
        }else{
            try {
                const { id, user_id, ...rest } = selectedWorkExperience.value 
                const res = await createWorkExperience(selectedWorkExperience.value)
                
                workExperienceList.value?.push(res.data)

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
            const res = await deleteWorkExperience(selectedWorkExperience.value.id)

            workExperienceList.value = workExperienceList.value?.filter(
                workExperience => workExperience.id !== selectedWorkExperience.value.id
            )

            toast.success(res.message)
            emit('close')
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }
    }

    watch(
        () => [props.isEdit, props.userWorkExperience] as const,
        ([isEdit, userEducation]) => {
            if (isEdit &&  userEducation) {
                selectedWorkExperience.value = { ...userEducation }
            }else {
                selectedWorkExperience.value = {
                    id: '',
                    position: '',
                    place_at: '',
                    start_date: new Date(),
                    'end_date': new Date(),
                    'user_id': ''
                }
            }
        },
        { immediate: true }
    )

</script>
<template>
    <BaseModal :open="open" @close="emit('close')">
        <h1 style="text-align: center;">{{ isEdit ? "Update Work Experience" : "Create Work Experience" }}</h1>
        <Input label="Position" placeholder="Backend developer" v-model="selectedWorkExperience.position"/>
        <Input label="Place At" placeholder="Hordford" v-model="selectedWorkExperience.place_at"/>
        <Input label="Start date" placeholder="11/11/2021" v-model="selectedWorkExperience.start_date" type="date"/>
        <Input label="End date" placeholder="11/12/2021" v-model="selectedWorkExperience.end_date" type="date"/>
        <div style="display: flex; gap:15px; align-items: center;">
            <button class="btn" @click="handleSubmit">Submit</button>
            <button v-if="isEdit" class="btn" @click="handleDelete">Delete</button>
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