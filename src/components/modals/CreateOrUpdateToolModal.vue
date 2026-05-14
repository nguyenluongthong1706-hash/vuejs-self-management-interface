<script setup lang="ts">
    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import { ref, computed, watch } from 'vue';

    import type { Tool } from '@type/entities';

    const {open = false, isEdit = false, tech} = defineProps<{
        open ?: boolean
        isEdit ?: boolean
        tech ?: Tool
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
        <h1 style="text-align: center;">{{ isEdit ? "Update tool" : "Create new tool" }}</h1>
        <Input label="Title" placeholder="Vs Code" :v-modal="selectedValues"/>
        <Input label="Icon Image" :v-modal="selectedValues" type="file"/>
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