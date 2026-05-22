import { defineStore } from "pinia"
import { ref } from "vue"
import { useToast } from "vue-toastification"

import type { Tech as TechType, Tool as ToolType } from "@type/entities"

import { getTools } from "@services/toolService"
import { getTechs } from "@services/techService"

export const useTechStackStore = defineStore("techStack", () => {
    const toast = useToast()

    const isLoading = ref(false)
    const isLoaded = ref(false)

    const tools = ref<ToolType[]>([])
    const techs = ref<TechType[]>([])

    const fetchTechStack = async (force = false) => {
        if (isLoading.value) return
        if (isLoaded.value && !force) return

        try {
            isLoading.value = true

            const [toolRes, techRes] = await Promise.all([
                getTools(),
                getTechs()
            ])

            tools.value = toolRes.data
            techs.value = techRes.data
            isLoaded.value = true
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Get tech stack fail")
        } finally {
            isLoading.value = false
        }
    }

    const resetTechStack = () => {
        isLoaded.value = false
        tools.value = []
        techs.value = []
    }

    return {
        isLoading,
        isLoaded,
        tools,
        techs,
        fetchTechStack,
        resetTechStack
    }
})