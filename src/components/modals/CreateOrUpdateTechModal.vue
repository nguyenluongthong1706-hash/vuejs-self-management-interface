<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useToast } from 'vue-toastification';
    
    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';

    import type { Tech as TechType } from '@type/entities';

    import { createTech, updateTech, deleteTech } from '@services/techService';

    const toast = useToast()

    const props = defineProps<{
        open ?: boolean
        isEdit ?: boolean
        tech ?: TechType
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const techList = defineModel<TechType[]>()

    const errors = ref<any>()

    const selectedTech = ref<TechType>({
        id: '',
        name: '',
        icon: ''
    })

    const techFormField = ref<{name: string, icon: File | null}>({
        name: '',
        icon: null
    })

    const handleSubmit = async ()=>{
        errors.value = null

        if(props.isEdit){
            
            const updateFormField:{name: string, icon?: File} =  {
                name: techFormField.value.name
            }
            if(techFormField.value.icon){
                updateFormField.icon = techFormField.value.icon
            }
            try {
                const res = await updateTech(selectedTech.value.id, updateFormField)
                
                const updatedTech = res.data

                const index = techList.value?.findIndex(
                    tech => tech.id === updatedTech.id
                )
                if (
                    index !== undefined &&
                    index !== -1 &&
                    techList.value
                ) {
                    techList.value[index] = updatedTech
                }

                toast.success(res.message)
                emit('close')
            } catch (error: any) {
                errors.value = error.response?.data?.errors
                toast.error(error.response?.data?.message)
            }
        }else{
            try {
                const res = await createTech(techFormField.value)
                
                techList.value?.push(res.data)

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
            const res = await deleteTech(selectedTech.value.id)

            techList.value = techList.value?.filter(
                tech => tech.id !== selectedTech.value.id
            )

            toast.success(res.message)
            emit('close')
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }
    }

    watch(
        () => [props.isEdit, props.tech] as const,
        ([isEdit, tech]) => {
            if (isEdit &&  tech) {
                selectedTech.value = { ...tech }
                techFormField.value.name = tech.name
            }else {
                selectedTech.value = {
                    id: '',
                    name: '',
                    icon: ''
                }
                techFormField.value = {
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
        <h1 style="text-align: center;">{{ isEdit ? "Update Tech" : "Create new tech" }}</h1>
        <Input :error="errors?.name" label="Name" placeholder="Java" v-model="techFormField.name"/>
        <Input :error="errors?.icon" label="Icon Image" v-model="techFormField.icon" type="file"/>
        <img style="width: 60px; object-fit: contain;" :src="selectedTech.icon" alt="">
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