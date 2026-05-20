<script setup lang="ts">
    import { computed } from 'vue'

    interface  InputOption {
        key: string
        value : string
        [key: string] : any
    }

    const {label, placeholder = "", type = "text", style="", error = "", readonly = false, options} = defineProps<{
        error ?: string
        label : string
        placeholder ?: string
        type ?: string
        style ?: string | Record<string, any>
        readonly ?: boolean
        options ?: InputOption[]
    }>()

    const modelValue = defineModel<string | File | Date | null | String[]>()

    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement

        if (target.files && target.files[0]) {
            modelValue.value = target.files[0]
        } else {
            modelValue.value = null
        }
    }

    const normalizedValue = computed({
        get() {
            if (type === 'date') {
                if (modelValue.value instanceof Date) {
                    const year = modelValue.value.getFullYear();
                    const month = String(modelValue.value.getMonth() + 1).padStart(2, '0');
                    const day = String(modelValue.value.getDate()).padStart(2, '0');

                    return `${year}-${month}-${day}`;
                }
                if (typeof modelValue.value === 'string') {
                    const d = new Date(modelValue.value);

                    if (!isNaN(d.getTime())) {
                        const year = d.getFullYear();
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const day = String(d.getDate()).padStart(2, '0');

                        return `${year}-${month}-${day}`;
                    }
                }
            }
            return modelValue.value;
        },
        set(newValue: string) {
            if (type === 'date' && newValue) {
                modelValue.value = newValue;
            } else {
                modelValue.value = newValue;
            }
        }
    });

</script>
<template>
    <div class="base-input">
        <p v-if="error" class="error-message">{{ error }}</p>
        <div class="input-container">
            <span class="field-label">{{ label }}:</span>
            <div style="display: flex; gap:9px" :class="{'checkbox-group' : type === 'checkbox'}" v-if="type === 'radio' || type === 'checkbox'">
                <label v-for="optionalValue in options" :key="optionalValue.key">
                    <input  :type="type" :value="optionalValue.key" v-model="normalizedValue" :disabled="optionalValue.disabled"> {{ optionalValue.value }}
                </label>
            </div>
            <input
                v-else-if="type === 'file'"
                class="field-input"
                :type="type"
                :style="style"
                @change="handleFileChange"
            />
            <input v-else class="field-input" :type="type" :placeholder="placeholder" :style="style" v-model="normalizedValue" :readonly="readonly">
        </div>
    </div>
</template> 
<style scoped>
    .base-input{
        margin: 18px 0;
    }
    .error-message{
        color: red;
        font-size: small;
        margin: 3px 0;
    }
    .input-container {
        display: flex;
        align-items:flex-start;
        gap:15px;
    }
    .field-label{
        display: inline-block;
        flex-shrink: 0;  
        font-weight: 600;
        width: 99px;
    }
    .input-container input{
        padding: 6px 9px;
        border-radius: 6px;
    }
    .field-input{
        min-width: 300px;
    }
    .checkbox-group{
        flex-direction: column;
    }
</style>