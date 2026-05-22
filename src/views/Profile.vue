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
        UserProduct, 
        User, 
        Tool as ToolType, 
        Tech as TechType, 
        UserEducation as EducationType, 
        UserWorkExperience as WorkExperienceType ,
        UserProduct as ProductType
    } from "@type/entities";

    import { getAccount, updateAccount } from "@services/accountService";
    import { getUserTools } from "@services/toolService";
    import { getUserTechs } from "@services/techService";
    import { getUserEducation } from "@services/educationService";
    import { getUserWorkExperience } from "@services/workExperienceService";
    import { getUserProduct } from "@services/productService";

    import { useUserStore } from "@stores/useUserStore";

    const toast = useToast()
    const userStore = useUserStore()

    const isToolModal = ref<boolean>(false)
    const isTechModal = ref<boolean>(false)
    const isCreateUserProductModal = ref<boolean>(false)
    const isUpdateUserProductModal = ref<boolean>(false)
    const isEducationModal = ref<boolean>(false)
    const isEditEducationModal = ref<boolean>(false)
    const isWorkExperienceModal = ref<boolean>(false)
    const isEditWorkExperienceModal = ref<boolean>(false)

    // user
    const userFormError = ref<any>()
    const user = ref<User>({
        id: '',
        name: '',
        email: '',
        dateOfBirth: '',
        gender: 'male',
        field: '',
        slogan: '',
        aboutMe: '',
        avatar: '',
        facebookLink:'',
        linkedinLink:'',
        githubLink: '',
        location : {province: '', district:'', ward:'', detail:''}
    })

    const handleUserSubmit = async ()=>{
        const userFormField = {
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
            userFormError.value = ''
            const res =  await updateAccount(userFormField)
            userStore.updateUser(user.value)
            toast.success(res.message)
        } catch (error: any) {
            userFormError.value = error.response?.data?.errors
            toast.error(error.response?.data?.message)
        }
    }

    // user tool
    const tools = ref<ToolType[]>([])

    // user tech
    const techs = ref<TechType[]>([])

    // user Education
    const educations = ref<EducationType[]>([])
    const editEducation = ref<EducationType | undefined>()

    // user Work Experience
    const workExperiences = ref<WorkExperienceType[]>([])
    const editWorkExperience = ref<WorkExperienceType | undefined>()

    // User Product
    const products = ref<ProductType[]>([])
    const editProduct = ref<ProductType | undefined>()

    const fetchData = async () =>{
        try {
            const [userRes, toolRes, techRes, educationRes, workExperienceRes, productRes] = await Promise.all([
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
        } catch (error:any) {
            toast.error(error.response?.data?.message || "get account fail")
        }
    }

    onMounted(fetchData)


</script>
<template>
    <div class="profile-container">
        <div class="avatar-box">
            <img class="avatar" :src="logo" alt="">
            <div class="profile-action">
                <button>action1</button>
                <button>action2</button>
                <button>action3</button>
            </div>
        </div>
        <!-- Basic Information -->
        <div class="box">
            <p class="title">Personal Information</p>
            <!-- Basic Information -->
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                <Input :error="userFormError?.name" v-model="user.name" placeholder="N.L.T" label="Name"/>
                <Input :error="userFormError?.dateOfBirth" v-model="user.dateOfBirth" label="Date of birth" type="date"/>
                <Input :error="userFormError?.gender" v-model="user.gender" label="Gender" type="radio" :options="[{key: 'male', value: 'Male'},{key:'female', value: 'Female'}]"/>
            </div>
            <!-- Other info -->
            <Input :error="userFormError?.email" v-model="user.email" placeholder="user@gmail.com" label="Email" type="email" readonly/>
            <Input :error="userFormError?.field" v-model="user.field" placeholder="Information technology" label="Field"/>
            <Input :error="userFormError?.slogan" v-model="user.slogan" placeholder="Try and try" label="Slogan"/>
            <Textarea :error="userFormError?.aboutMe" v-model="user.aboutMe" placeholder="I am ...." label="About me"/>
            <!-- Address -->
            <div>
                <p style="font-size: 21px; font-weight: bold; margin-bottom: 18px;">Address</p>
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <Input :error="userFormError?.location?.province" v-model="user.location.province" placeholder="da nang" label="Province"/>
                    <Input :error="userFormError?.location?.district" v-model="user.location.district" placeholder="Cam le" label="District"/>
                    <Input :error="userFormError?.location?.ward" v-model="user.location.ward" placeholder="Hai Chau" label="Ward"/>
                </div>
                <Input :error="userFormError?.location?.detail" v-model="user.location.detail" style="width: 100%;" placeholder="floor 2, building 2, xxx street,..." label="Detail"/>
            </div>
            <!-- Meta -->
            <p style="font-size: 21px; font-weight: bold; margin-bottom: 18px;">Meta</p>
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                <Input :error="userFormError?.facebookLink" v-model="user.facebookLink" placeholder="Link facebook" label="Link facebook"/>
                <Input :error="userFormError?.linkedinLink" v-model="user.linkedinLink" placeholder="Link linkedin" label="Link linkedin"/>
                <Input :error="userFormError?.githubLink" v-model="user.githubLink" placeholder="Link github" label="Link github"/>
            </div>
            <button @click="handleUserSubmit" class="btn">Edit</button>
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
    .avatar-box{
        display: flex;
        justify-content:space-around;
        align-items: center;
        margin: 12px 0;
    }
    .avatar{
        width: 150px;
        height: 150px;
        border-radius: 100%;
        border: 3px solid white;
        object-fit:contain;
    }
    .profile-action{
        display: flex;
        flex-direction: column;
        padding: 12px 45px;
        gap:15px;
    }
    .profile-action button{
        background: gainsboro;
        padding: 6px 15px;
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