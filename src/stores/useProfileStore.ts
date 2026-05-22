import { defineStore } from "pinia"
import { ref } from "vue"
import { useToast } from "vue-toastification"

import type {
    User,
    Tool as ToolType,
    Tech as TechType,
    UserEducation as EducationType,
    UserWorkExperience as WorkExperienceType,
    UserProduct as ProductType
} from "@type/entities"

import { getAccount } from "@services/accountService"
import { getUserTools } from "@services/toolService"
import { getUserTechs } from "@services/techService"
import { getUserEducation } from "@services/educationService"
import { getUserWorkExperience } from "@services/workExperienceService"
import { getUserProduct } from "@services/productService"

export const useProfileStore = defineStore("profile", () => {
    const toast = useToast()

    const isLoading = ref(false)
    const isLoaded = ref(false)

    const user = ref<User | null>(null)
    const tools = ref<ToolType[]>([])
    const techs = ref<TechType[]>([])
    const educations = ref<EducationType[]>([])
    const workExperiences = ref<WorkExperienceType[]>([])
    const products = ref<ProductType[]>([])

    const fetchProfile = async (force = false) => {
        if (isLoading.value) return
        if (isLoaded.value && !force) return

        try {
            isLoading.value = true

            const [
                userRes,
                toolRes,
                techRes,
                educationRes,
                workExperienceRes,
                productRes
            ] = await Promise.all([
                getAccount(),
                getUserTools(),
                getUserTechs(),
                getUserEducation(),
                getUserWorkExperience(),
                getUserProduct()
            ])

            user.value = userRes.data
            tools.value = toolRes.data
            techs.value = techRes.data
            educations.value = educationRes.data
            workExperiences.value = workExperienceRes.data
            products.value = productRes.data

            isLoaded.value = true
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Get profile fail")
        } finally {
            isLoading.value = false
        }
    }

    const resetProfile = () => {
        isLoaded.value = false
        user.value = null
        tools.value = []
        techs.value = []
        educations.value = []
        workExperiences.value = []
        products.value = []
    }

    return {
        isLoading,
        isLoaded,
        user,
        tools,
        techs,
        educations,
        workExperiences,
        products,
        fetchProfile,
        resetProfile
    }
})
