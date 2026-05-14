<script setup lang="ts">
    interface  OptionalItem {
        key: string
        value : string
        [key: string] : any
    }
    const {label, placeholder = "", type = "text", style="", error = "", readonly = false, optionalValues} = defineProps<{
        error ?: string
        label : string
        placeholder ?: string
        type ?: string
        style ?: string | Record<string, any>
        readonly ?: boolean
        optionalValues ?: OptionalItem[]
    }>()

    const value = defineModel()

</script>
<template>
    <div class="input-component">
        <p v-if="error" class="error-field">{{ error }}</p>
        <div class="input-field">
            <span class="input-field-span">{{ label }}:</span>
            <div style="display: flex; gap:9px" :class="{'checkbox-box' : type === 'checkbox'}" v-if="type === 'radio' || type === 'checkbox'">
                <label v-for="optionalValue in optionalValues" :key="optionalValue.key">
                    <input  :type="type" :value="optionalValue.key" v-model="value" :disabled="optionalValue.disabled"> {{ optionalValue.value }}
                </label>
            </div>
            <input v-else class="main-input-field" :type="type" :placeholder="placeholder" :style="style" v-model="value" :readonly="readonly">
        </div>
    </div>
</template> 
<style scoped>
    .input-component{
        margin: 12px 0;
    }
    .error-field{
        color: red;
        font-size: small;
    }
    .input-field {
        display: flex;
        align-items:flex-start;
        gap:15px;
    }
    .input-field-span{
        display: inline-block;
        flex-shrink: 0;  
        font-weight: 600;
        width: 99px;
    }
    .input-field input{
        padding: 6px 9px;
        border-radius: 6px;
    }
    .main-input-field{
        min-width: 300px;
    }
    .checkbox-box{
        flex-direction: column;
    }
</style>