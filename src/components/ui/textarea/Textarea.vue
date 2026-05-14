<script setup lang="ts">
    const {label, placeholder = "", style="", error = ""} = defineProps<{
        error ?: string
        label : string
        placeholder ?: string
        style ?: string | Record<string, any>
    }>()

    const value = defineModel<string>()

</script>
<template>
    <div class="textarea-component">
        <p v-if="error" class="error-field">{{ error }}</p>
        <div class="textarea-field">
            <span>{{ label }}:</span>
            <textarea :placeholder="placeholder" :style="style" v-model="value"></textarea>
        </div>
    </div>
</template> 
<style scoped>
    .textarea-component{
        margin: 12px 0;
    }
    .error-field{
        color: red;
        font-size: small;
    }
    .textarea-field{
        display: flex;
        align-items:flex-start;
        gap:15px;
    }
    .textarea-field span{
        display: inline-block;
        flex-shrink: 0;  
        font-weight: 600;
        width: 99px;
    }
    .textarea-field textarea{
        width: 100%;
        height: 120px;
        padding: 6px 9px;
        border-radius: 6px;
    }
</style>