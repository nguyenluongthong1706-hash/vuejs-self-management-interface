<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { useToast } from "vue-toastification";

    import logo from "@assets/logo.svg"

    import Input from "@components/ui/input/Input.vue";
    import Textarea from "@components/ui/textarea/Textarea.vue";

    import AssignTechUserModal from "@components/modals/AssignTechUserModal.vue";
    import CreateUserProductModal from "@components/modals/CreateUserProductModal.vue";
    import UpdateUserProductModal from "@components/modals/UpdateUserProductModal.vue";
    import UpdateOrCreateEducationModal from "@components/modals/UpdateOrCreateEducationModal.vue";
    import UpdateOrCreateWorkExperienceModal from "@components/modals/UpdateOrCreateWorkExperienceModal.vue";

    import Tech from "@components/sections/Tech.vue";
    import Education from "@components/sections/Education.vue";
    import Experience from "@components/sections/Experience.vue";
    import Product from "@components/sections/Product.vue";

    import type { 
        User, 
        Tool as ToolType, 
        Tech as TechType, 
        UserEducation as EducationType, 
        UserWorkExperience as WorkExperienceType ,
        UserProduct as ProductType
    } from "@type/entities";
    
    import type { FormErrors } from "@type/responses"
    import type { UpdateAccountRequest } from "@type/requests"

    import { updateAccount, uploadAvatar } from "@services/accountService";

    import { useUserStore } from "@stores/useUserStore";
    import { storeToRefs } from "pinia"
    import { useProfileStore } from "@stores/useProfileStore"

    const profileStore = useProfileStore()

    const {
        isLoading: isPageLoading,
        user,
        tools,
        techs,
        educations,
        workExperiences,
        products
    } = storeToRefs(profileStore)

    const toast = useToast()
    const userStore = useUserStore()

    const updateProfileLoading = ref(false)
    const uploadAvatarLoading = ref(false)

    const isToolModal = ref<boolean>(false)
    const isTechModal = ref<boolean>(false)
    const isCreateUserProductModal = ref<boolean>(false)
    const isUpdateUserProductModal = ref<boolean>(false)
    const isEducationModal = ref<boolean>(false)
    const isEditEducationModal = ref<boolean>(false)
    const isWorkExperienceModal = ref<boolean>(false)
    const isEditWorkExperienceModal = ref<boolean>(false)

    // user
    const fileInput = ref<HTMLInputElement | null>(null)
    
    const userFormError = ref<FormErrors>()

    const handleUserSubmit = async ()=>{
        if (updateProfileLoading.value) return
        if (!user.value) return

        const userFormField: UpdateAccountRequest = {
            name : user.value.name,
            dateOfBirth : user.value.dateOfBirth,
            gender : user.value.gender,
            field : user.value.field,
            slogan : user.value.slogan,
            aboutMe : user.value.aboutMe,
            facebookLink : user.value.facebookLink,
            linkedinLink : user.value.linkedinLink,
            githubLink : user.value.githubLink,
            location:{
                province: user.value.location.province,
                district: user.value.location.district,
                ward: user.value.location.ward,
                detail: user.value.location.detail
            }
        }
        try {
            updateProfileLoading.value = true
            userFormError.value = {}
            const res =  await updateAccount(userFormField)
            userStore.updateUser(user.value)
            toast.success(res.message)
        } catch (error: any) {
            userFormError.value = error.response?.data?.errors
            toast.error(error.response?.data?.message)
        }finally {
            updateProfileLoading.value = false
        }
    }

    const handleChooseAvatar = () => {
        fileInput.value?.click()
    }

    const handleUploadAvatar = async (event: Event) => {
        if (uploadAvatarLoading.value) return

        const target = event.target as HTMLInputElement

        if (!target.files || target.files.length === 0) return

        const file = target.files[0]

        try {
            uploadAvatarLoading.value = true

            if(!file) return
            const res = await uploadAvatar({
                avatar: file
            })

            user.value = res.data

            userStore.updateUser(user.value)

            toast.success(res.message)
        }
        catch (error: any) {
           toast.error(error.response?.data?.message || "get account fail")
        } finally {
            uploadAvatarLoading.value = false
        }
    }

    // user tool

    // user tech

    // user Education
    const editEducation = ref<EducationType | undefined>()

    // user Work Experience
    const editWorkExperience = ref<WorkExperienceType | undefined>()

    // User Product
    const editProduct = ref<ProductType | undefined>()

    onMounted(() => {
        profileStore.fetchProfile()
    })


</script>
<template>
    <div class="profile-container">
        <div v-if="isPageLoading" class="page-loading">
            Loading...
        </div>
        <template v-else-if="user">
            <div class="avatar-box">
                <img class="avatar" :src="user?.avatar || logo" alt="">

                <div class="profile-action">
                    <button :disabled="uploadAvatarLoading" @click="handleChooseAvatar">
                        {{ uploadAvatarLoading ? "Uploading..." : "Upload" }}
                    </button>
                    <input
                        ref="fileInput"
                        type="file"
                        accept="image/*"
                        hidden
                        @change="handleUploadAvatar"
                    >
                </div>
            </div>
            <!-- Basic Information -->
            <div class="box">
                <p class="title">Personal Information</p>
                <!-- Basic Information -->
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <Input :error="userFormError?.name?.[0]" v-model="user.name" placeholder="N.L.T" label="Name"/>
                    <Input :error="userFormError?.dateOfBirth?.[0]" v-model="user.dateOfBirth" label="Date of birth" type="date"/>
                    <Input :error="userFormError?.gender?.[0]" v-model="user.gender" label="Gender" type="radio" :options="[{key: 'male', value: 'Male'},{key:'female', value: 'Female'}]"/>
                </div>
                <!-- Other info -->
                <Input :error="userFormError?.email?.[0]" v-model="user.email" placeholder="user@gmail.com" label="Email" type="email" readonly/>
                <Input :error="userFormError?.field?.[0]" v-model="user.field" placeholder="Information technology" label="Field"/>
                <Input :error="userFormError?.slogan?.[0]" v-model="user.slogan" placeholder="Try and try" label="Slogan"/>
                <Textarea :error="userFormError?.aboutMe?.[0]" v-model="user.aboutMe" placeholder="I am ...." label="About me"/>
                <!-- Address -->
                <div>
                    <p style="font-size: 21px; font-weight: bold; margin-bottom: 18px;">Address</p>
                    <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                        <Input :error="userFormError?.['location?.province']?.[0]" v-model="user.location.province" placeholder="da nang" label="Province"/>
                        <Input :error="userFormError?.['location?.district']?.[0]" v-model="user.location.district" placeholder="Cam le" label="District"/>
                        <Input :error="userFormError?.['location?.ward']?.[0]" v-model="user.location.ward" placeholder="Hai Chau" label="Ward"/>
                    </div>
                    <Input :error="userFormError?.['location?.detail']?.[0]" v-model="user.location.detail" style="width: 100%;" placeholder="floor 2, building 2, xxx street,..." label="Detail"/>
                </div>
                <!-- Meta -->
                <p style="font-size: 21px; font-weight: bold; margin-bottom: 18px;">Meta</p>
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <Input :error="userFormError?.facebookLink?.[0]" v-model="user.facebookLink" placeholder="Link facebook" label="Link facebook"/>
                    <Input :error="userFormError?.linkedinLink?.[0]" v-model="user.linkedinLink" placeholder="Link linkedin" label="Link linkedin"/>
                    <Input :error="userFormError?.githubLink?.[0]" v-model="user.githubLink" placeholder="Link github" label="Link github"/>
                </div>
                <button @click="handleUserSubmit" class="btn" :disabled="updateProfileLoading">
                    {{ updateProfileLoading ? "Loading..." : "Edit Profile" }}
                </button>
            </div>
            <!-- Tool -->
            <div class="box">
                <div class="box-header">
                    <p class="title">Tools</p>
                    <button class="btn" @click="isToolModal = true">Assign tool</button>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap:12px;">
                    <Tech
                        is-tool
                        allow-unassign-user
                        v-for="tool in tools" 
                        :key="tool.id"
                        :item="tool"
                        v-model="tools"
                    />
                </div>
            </div>
            <!-- Tech Stack -->
            <div class="box">
                <div class="box-header">
                    <p class="title">Languages and frameworks</p>
                    <button class="btn" @click="isTechModal = true">Assign tech</button>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap:12px;">
                    <Tech
                        allow-unassign-user
                        v-for="tech in techs" 
                        :key="tech.id"
                        :item="tech"
                        v-model="techs"
                    />
                </div>
            </div>
            <!-- Educations -->
            <div class="box">
                <div class="box-header">
                    <p class="title">Educations</p>
                    <button class="btn" @click="{isEducationModal = true; isEditEducationModal = false}">Add new</button>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                    <Education
                        v-for="education in educations" 
                        :key="education.id"
                        :education="education"
                        @click="{isEducationModal= true; isEditEducationModal = true; editEducation = education}"
                    />
                </div>
            </div>
            <!-- Work Experiences -->
            <div class="box">
                <div class="box-header">
                    <p class="title">Work Experiences</p>
                    <button class="btn" @click="{isWorkExperienceModal = true; isEditWorkExperienceModal = false}">Add new</button>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                    <Experience
                        v-for="workExperience in workExperiences" 
                        :key="workExperience.id"
                        :work-experience="workExperience"
                        @click="{isWorkExperienceModal= true; isEditWorkExperienceModal = true; editWorkExperience = workExperience}"
                    />
                </div>
            </div>
            <!-- Product -->
            <div class="box">
                <div class="box-header">
                    <p class="title">Products</p>
                    <button class="btn" @click="isCreateUserProductModal = true">Add new</button>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                    <Product 
                        v-for="product in products"
                        :key="product.id"
                        @click="{isUpdateUserProductModal = true; editProduct = product}" 
                        :product="product"
                    />
                </div>
            </div>
        </template>
    </div>
    <!-- Modal -->
    <AssignTechUserModal 
        :open="isTechModal" 
        @close="isTechModal = false"
        v-model:tech-modal="techs" 
        :user-techs="techs" 
    />
    <AssignTechUserModal 
        is-tool
        :open="isToolModal"  
        @close="isToolModal = false" 
        v-model:tool-modal="tools" 
        :user-tools="tools" 
    />
    <CreateUserProductModal 
        :open="isCreateUserProductModal" 
        @close="isCreateUserProductModal = false"
        v-model:products="products"
    />
    <UpdateUserProductModal 
        :open="isUpdateUserProductModal" 
        @close="isUpdateUserProductModal = false"
        v-model:products="products"
        :product="editProduct" 
    />
    <UpdateOrCreateEducationModal 
        :open="isEducationModal"  
        :is-editing="isEditEducationModal"
        @close="isEducationModal = false" 
        v-model="educations" 
        :education="editEducation" 
    />
    <UpdateOrCreateWorkExperienceModal 
        :open="isWorkExperienceModal" 
        :is-editing="isEditWorkExperienceModal"
        @close="isWorkExperienceModal = false" 
        v-model="workExperiences" 
        :work-experience="editWorkExperience" 
    />
</template>
<style scoped>
    .profile-container{
        min-height: 100%;
        padding: 12px 21px;
        background-color: rgb(245, 245, 245);
    }
    .page-loading {
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 600;
        color: #555;
    }
    .avatar-box{
        display: flex;
        align-items: center;
        gap: 20px;
        margin: 12px 0;
    }
    .avatar{
        width: 150px;
        height: 150px;
        border-radius: 100%;
        object-fit: contain;
        border: 3px solid #fff;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .profile-action{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .profile-action button{
        background: #3b82f6;
        color: white;
        padding: 6px 15px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
    }
    .box{
        margin: 24px 0;
        padding: 12px 24px;
        background-color: white;
        border-radius: 9px;
    }
    .box-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title{
        font-size: 27px;
        font-weight: bold;
        margin-bottom: 18px;
    }
    .btn{
        padding: 9px 27px;
        border-radius: 9px;
        margin: 12px 0;
        cursor: pointer;
    }
</style>
