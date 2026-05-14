<script setup lang="ts">
    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';
    import { ref, computed, watch } from 'vue';

    import type { UserTool, UserTech } from '@type/entities';

    const {open = false, isTool = false, userTools, userTechs} = defineProps<{
        open ?: boolean
        isTool ?: boolean
        userTools ?: UserTool[]
        userTechs ?: UserTech[]
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const selectedValues = ref<string[]>([])

    const tools = [{id:'t1', title : '1', logo :''},{id:'t2', title : '2', logo :''},]
    const techs = [{id:'te1', title : '1', logo :''},{id:'te2', title : '2', logo :''}]

    const okTools = [{id:'o1', user_id: 'u1', tool_id: 't1'}]
    const okTechs = [{id:'ot1', user_id: 'u1', tech_id: 'te1'}]

    const currentOptions = computed(() => {
        if (isTool) {
            return tools.map(o => ({
            key: o.id,
            value: o.title,
            disabled: okTools.some(tool => tool.tool_id === o.id)
            }))
        } else {
            return techs.map(o => ({
            key: o.id,
            value: o.title,
            disabled: okTechs.some(tech => tech.tech_id === o.id)
            }))
        }
    })

    const handleSubmit = ()=>{
        const newSelectedValues = selectedValues.value.filter(idValue =>  {
            const mappingOption = currentOptions.value.find(option => option.key === idValue)
            return mappingOption ? !mappingOption.disabled : false
        })

        const key = isTool ? 'tool_id' : 'tech_id'
        const result = newSelectedValues.map(selectedValue => {
            return{
                [key] : selectedValue
            }
        })
    }

    watch(
        () => isTool,
        (newIsTool) => {
            if (newIsTool) {
            selectedValues.value = okTools.map(ok => ok.tool_id)
            } else {
            selectedValues.value = okTechs.map(ok => ok.tech_id)
            }
        },
        { immediate: true }
    )

</script>
<template>
    <BaseModal :open="open" @close="emit('close')">
        <h1 style="text-align: center;">{{ isTool ? "Assign Tool" : "Assign Languages or Framework" }}</h1>
        <div>
            <Input 
                type="checkbox" 
                v-model="selectedValues" 
                :label="isTool ? 'Tool' : 'Languages or Framework' " 
                :optional-values="currentOptions"
            />
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