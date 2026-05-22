<script setup lang="ts">
    import { ref, computed, watch, onMounted } from 'vue'
    import { useToast } from 'vue-toastification';

    import BaseModal from '@components/ui/modal/BaseModal.vue';
    import Input from '@components/ui/input/Input.vue';

    import type { Tool, Tech } from '@type/entities';

    import { getTools, assignTools  } from '@services/toolService';
    import { getTechs, assignTechs } from '@services/techService';

    const selectedTools = defineModel<Tool[]>('toolModal')
    const selectedTechs  = defineModel<Tech[]>('techModal')

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

    const resourceType  = ref<'techs' | 'tools'>('techs')
    const selectedIds = ref<string[]>([])

    const tools = ref<Tool[]>([])
    const techs = ref<Tech[]>([])
    const errors = ref<any>()
    

    const fetchOptions = async ()=>{
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
    onMounted(fetchOptions)

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
        const validSelectedIds = selectedIds.value.filter(idValue => {
            const matchedOption = currentOptions.value.find(
                option => option.key === idValue
            )

            return matchedOption ? !matchedOption.disabled : false
        })

        try {
            if (props.isTool) {

                const toolAssignments: { toolId: string }[] =
                    validSelectedIds.map(idValue => ({
                        toolId: idValue
                    })
                )

                const res = await assignTools({
                    tools: toolAssignments
                })
                selectedTools.value = res.data
                toast.success(res.message)

            } else {

                const techAssignments: { techId: string }[] =
                    validSelectedIds.map(idValue => ({
                        techId: idValue
                    })
                )
                const res = await assignTechs({
                    techs: techAssignments
                })
                selectedTechs .value = res.data
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
            () => props.open,
            () => props.isTool,
            () => props.userTools,
            () => props.userTechs
        ],
        () => {
            if (props.isTool) {
                selectedIds.value = props.userTools?  props.userTools.map(userTool => userTool.id) : []
                resourceType .value = 'tools'
            } else {
                selectedIds.value = props.userTechs? props.userTechs.map(userTech => userTech.id) : []
                resourceType .value = 'techs'
            }
            if(props.open){
                errors.value = ""
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
                :error="errors?.[resourceType ]"
                type="checkbox" 
                v-model="selectedIds" 
                :label="isTool ? 'Tool' : 'Languages or Framework' " 
                :options="currentOptions"
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