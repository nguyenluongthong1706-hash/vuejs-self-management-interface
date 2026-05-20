<script setup lang="ts">
    const {label, placeholder = "", style="", error = ""} = defineProps<{
        error ?: string
        label : string
        placeholder ?: string
        style ?: string | Record<string, any>
    }>()

    const modelValue = defineModel<string>()

</script>
<template>
    <div class="textarea">
        <p v-if="error" class="error-message">{{ error }}</p>
        <div class="textarea-container">
            <span>{{ label }}:</span>
            <textarea :placeholder="placeholder" :style="style" v-model="modelValue"></textarea>
        </div>
    </div>
</template> 
<style scoped>
    .textarea{
        margin: 12px 0;
    }
    .error-message{
        color: red;
        font-size: small;
    }
    .textarea-container{
        display: flex;
        align-items:flex-start;
        gap:15px;
    }
    .textarea-container span{
        display: inline-block;
        flex-shrink: 0;  
        font-weight: 600;
        width: 99px;
    }
    .textarea-container textarea{
        width: 100%;
        height: 120px;
        padding: 6px 9px;
        border-radius: 6px;
    }
</style>