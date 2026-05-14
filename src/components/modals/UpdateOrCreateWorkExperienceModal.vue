<script setup lang="ts">
    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import { ref, computed, watch } from 'vue';

    import type { UserWorkExperience } from '@type/entities';

    const {open = false, isEdit = false, userWorkExperience} = defineProps<{
        open ?: boolean
        isEdit ?: boolean
        userWorkExperience ?: UserWorkExperience
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const selectedValues = ref<string[]>([])

    const handleSubmit = ()=>{
    }

    watch(
        () => isEdit,
        (newIsEdit) => {
            if (newIsEdit) {
            }
        },
        { immediate: true }
    )

</script>
<template>
    <BaseModal :open="open" @close="emit('close')">
        <h1 style="text-align: center;">{{ isEdit ? "Update Work Experience" : "Create Work Experience" }}</h1>
        <Input label="Position" placeholder="Backend developer" :v-modal="selectedValues"/>
        <Input label="Place At" placeholder="Hordford" :v-modal="selectedValues"/>
        <Input label="Start date" placeholder="11/11/2021" :v-modal="selectedValues" type="date"/>
        <Input label="End date" placeholder="11/12/2021" :v-modal="selectedValues" type="date"/>
        <div>
            <button class="btn" @click="handleSubmit">Submit</button>
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