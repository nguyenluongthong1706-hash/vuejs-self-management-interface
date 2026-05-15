<script setup lang="ts">
    import { computed } from 'vue'
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

    const value = defineModel<string | File | Date | null>()

    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement

        if (target.files && target.files[0]) {
            value.value = target.files[0]
        } else {
            value.value = null
        }
    }

    const proxyValue = computed({
        get() {
            if (type === 'date' && typeof value.value === 'string') {
                const d = new Date(value.value);

                if (!isNaN(d.getTime())) {
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                }
            }
            return value.value;
        },
        set(newValue: string) {
            if (type === 'date' && newValue) {
                value.value = new Date(newValue);
            } else {
                value.value = newValue;
            }
        }
    });

</script>
<template>
    <div class="input-component">
        <p v-if="error" class="error-field">{{ error }}</p>
        <div class="input-field">
            <span class="input-field-span">{{ label }}:</span>
            <div style="display: flex; gap:9px" :class="{'checkbox-box' : type === 'checkbox'}" v-if="type === 'radio' || type === 'checkbox'">
                <label v-for="optionalValue in optionalValues" :key="optionalValue.key">
                    <input  :type="type" :value="optionalValue.key" v-model="proxyValue" :disabled="optionalValue.disabled"> {{ optionalValue.value }}
                </label>
            </div>
            <input
                v-else-if="type === 'file'"
                class="main-input-field"
                :type="type"
                :style="style"
                @change="handleFileChange"
            />
            <input v-else class="main-input-field" :type="type" :placeholder="placeholder" :style="style" v-model="proxyValue" :readonly="readonly">
        </div>
    </div>
</template> 
<style scoped>
    .input-component{
        margin: 18px 0;
    }
    .error-field{
        color: red;
        font-size: small;
        margin: 3px 0;
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