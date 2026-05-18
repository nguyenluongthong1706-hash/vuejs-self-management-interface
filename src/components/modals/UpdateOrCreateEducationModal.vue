<script setup lang="ts">
    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import { ref, computed, watch } from 'vue';
    import { useToast } from 'vue-toastification';

    import type { UserEducation } from '@type/entities';

    import { createEducation, updateEducation, deleteEducation } from '@services/educationService';

    const props = defineProps<{
        open ?: boolean
        isEdit ?: boolean
        userEducation ?: UserEducation
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const toast = useToast()

    const educationList = defineModel<UserEducation[]>()

    const errors = ref<any>()

    const selectedEducation = ref<UserEducation>({
        id: '',
        name: '',
        degree: '',
        start_date: new Date(),
        'end_date': new Date(),
        'user_id': ''
    })

    const handleSubmit = async ()=>{
        errors.value = null

        if(props.isEdit){
            try {
                const { id, user_id, ...rest } = selectedEducation.value 
                const res = await updateEducation(selectedEducation.value.id, rest)
                
                const updatedTech = res.data

                const index = educationList.value?.findIndex(
                    education => education.id === updatedTech.id
                )
                if (
                    index !== undefined &&
                    index !== -1 &&
                    educationList.value
                ) {
                    educationList.value[index] = updatedTech
                }

                toast.success(res.message)
                emit('close')
            } catch (error: any) {
                errors.value = error.response?.data?.errors
                toast.error(error.response?.data?.message)
            }
        }else{
            try {
                const { id, user_id, ...rest } = selectedEducation.value 
                const res = await createEducation(selectedEducation.value)
                
                educationList.value?.push(res.data)

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
            const res = await deleteEducation(selectedEducation.value.id)

            educationList.value = educationList.value?.filter(
                education => education.id !== selectedEducation.value.id
            )

            toast.success(res.message)
            emit('close')
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }
    }

    watch(
        () => [props.isEdit, props.userEducation] as const,
        ([isEdit, userEducation]) => {
            if (isEdit &&  userEducation) {
                selectedEducation.value = { ...userEducation }
            }else {
                selectedEducation.value = {
                    id: '',
                    name: '',
                    degree: '',
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
        <h1 style="text-align: center;">{{ isEdit ? "Update Education" : "Create Education" }}</h1>
        <Input label="Name" placeholder="School" v-model="selectedEducation.name"/>
        <Input label="Degree" placeholder="Information Technology" v-model="selectedEducation.degree"/>
        <Input label="Start date" placeholder="11/11/2021" v-model="selectedEducation.start_date" type="date"/>
        <Input label="End date" placeholder="11/12/2021" v-model="selectedEducation.end_date" type="date"/>
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