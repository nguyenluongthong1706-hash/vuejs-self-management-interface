<script setup lang="ts">
    import { ref, computed, watch, onMounted } from 'vue'
    import { useToast } from 'vue-toastification';

    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';

    import type { Tool, Tech } from '@type/entities';

    import { getTools, assignMultipleTool  } from '@services/toolService';
    import { getTechs, assignMultipleTech } from '@services/techService';

    const toolModel = defineModel<Tool[]>('toolModal')
    const techModel = defineModel<Tech[]>('techModal')

    const props = defineProps<{
        open?: boolean
        isTool?: boolean
        userTools?: Tool[]
        userTechs?: Tech[]
    }>()

    const emit = defineEmits<{
        (e : 'close') : void
    }>()

    const toast = useToast()
    const loading = ref(false)

    const field = ref<'techs' | 'tools'>('techs')
    const selectedValues = ref<string[]>([])

    const tools = ref<Tool[]>([])
    const techs = ref<Tech[]>([])
    const errors = ref<any>()

    // const okTools = [{id:'o1', user_id: 'u1', tool_id: 't1'}]
    // const okTechs = [{id:'ot1', user_id: 'u1', tech_id: 'te1'}]

    const fetchData = async ()=>{
        try {
            loading.value = true
            const [toolRes, techRes] = await Promise.all([
                getTools(),
                getTechs()
            ])
            tools.value = toolRes.data
            techs.value = techRes.data
        } catch (error : any) {
            toast.error(error.response?.data?.message || "get data fail")
        }finally {
            loading.value = false
        }
    }
    onMounted(fetchData)

    const currentOptions = computed(() => {
        if (props.isTool) {
            return tools.value.map(tool => ({
            key: tool.id,
            value: tool.name,
            disabled: props.userTools ?  props.userTools.some(userTool => userTool.id === tool.id) : false
            }))
        } 
        return techs.value.map(tech => ({
        key: tech.id,
        value: tech.name,
        disabled: props.userTechs ? props.userTechs.some(userTech => userTech.id === tech.id) : false
        }))
        
    })

    const handleSubmit = async () => {
        const availableSelectedValues = selectedValues.value.filter(idValue => {
            const mappingOption = currentOptions.value.find(
                option => option.key === idValue
            )

            return mappingOption ? !mappingOption.disabled : false
        })

        try {
            if (props.isTool) {

                const result: { tool_id: string }[] =
                    availableSelectedValues.map(selectedValue => ({
                        tool_id: selectedValue
                    }))
                const res = await assignMultipleTool({
                    tools: result
                })
                toolModel.value = res.data
                toast.success(res.message)

            } else {

                const result: { tech_id: string }[] =
                    availableSelectedValues.map(selectedValue => ({
                        tech_id: selectedValue
                    }))
                const res = await assignMultipleTech({
                    techs: result
                })
                techModel.value = res.data
                toast.success(res.message)
            }
            emit('close')

        } catch (error: any) {
            errors.value = error.response?.data?.errors
            toast.error(error.response?.data?.message)
        }
    }

    watch(
        [
            () => props.isTool,
            () => props.userTools,
            () => props.userTechs
        ],
        () => {
            if (props.isTool) {
            selectedValues.value = props.userTools?  props.userTools.map(userTool => userTool.id) : []
            field.value = 'tools'
            } else {
            selectedValues.value = props.userTechs? props.userTechs.map(userTech => userTech.id) : []
            field.value = 'techs'
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
                :error="errors?.[field]"
                type="checkbox" 
                v-model="selectedValues" 
                :label="isTool ? 'Tool' : 'Languages or Framework' " 
                :optional-values="currentOptions"
            />
            <button :disabled="loading" class="btn" @click="handleSubmit">{{ loading ? "Loading" : "Submit" }}</button>
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