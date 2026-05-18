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
    } from "@type/entities";

    import { getAccount, updateAccount } from "@services/accountService";
    import { getUserTools } from "@services/toolService";
    import { getUserTechs } from "@services/techService";
    import { getUserEducation } from "@services/educationService";
    import { getUserWorkExperience } from "@services/workExperienceService";

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
        date_of_birth: new Date(),
        gender: 'male',
        field: '',
        slogan: '',
        about_me: '',
        avatar: '',
        facebook_link:'',
        linkedin_link:'',
        github_link: '',
        location : {level1: '', level2:'', level3:'', detail:''},
        create_at: new Date(),
        update_at: new Date()
    })

    const handleUserSubmit = async ()=>{
        const userFormField = {
            name : user.value.name,
            date_of_birth : user.value.date_of_birth,
            gender : user.value.gender,
            field : user.value.field,
            slogan : user.value.slogan,
            about_me : user.value.about_me,
            facebook_link : user.value.facebook_link,
            linkedin_link : user.value.linkedin_link,
            github_link : user.value.github_link,
            level1 : user.value.location.level1,
            level2 : user.value.location.level2,
            level3 : user.value.location.level3,
            detail : user.value.location.detail,
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

    const fetchData = async () =>{
        try {
            const [userRes, toolRes, techRes, educationRes, workExperienceRes] = await Promise.all([
                getAccount(),
                getUserTools(),
                getUserTechs(),
                getUserEducation(),
                getUserWorkExperience(),
            ])
            user.value = userRes.data
            tools.value = toolRes.data
            techs.value = techRes.data
            educations.value = educationRes.data
            workExperiences.value = workExperienceRes.data
        } catch (error:any) {
            toast.error(error.response?.data?.message || "get account fail")
        }
    }

    onMounted(fetchData)

    // 
    const product = {
        id:'', 
        name: 'product', 
        description:'description....', 
        task:'task....', image:'http://...',
        start_date: new Date(), 
        end_date: new Date(), 
        user_id:'e01', 
        product_techs:[{id:'p1', tech_id :'te1', name: 'java', icon:''},{id:'p2', tech_id :'te2', name: 'python', icon:''}],
        product_urls: [{ id:'r1', title: 'title', link: 'http://' }]
    } as UserProduct


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
                <Input :error="userFormError?.date_of_birth" v-model="user.date_of_birth" label="Date of birth" type="date"/>
                <Input :error="userFormError?.gender" v-model="user.gender" label="Gender" type="radio" :optional-values="[{key: 'male', value: 'Male'},{key:'female', value: 'Female'}]"/>
            </div>
            <!-- Other info -->
            <Input :error="userFormError?.email" v-model="user.email" placeholder="user@gmail.com" label="Email" type="email" readonly/>
            <Input :error="userFormError?.field" v-model="user.field" placeholder="Information technology" label="Field"/>
            <Input :error="userFormError?.slogan" v-model="user.slogan" placeholder="Try and try" label="Slogan"/>
            <Textarea :error="userFormError?.about_me" v-model="user.about_me" placeholder="I am ...." label="About me"/>
            <!-- Address -->
            <div>
                <p style="font-size: 21px; font-weight: bold; margin-bottom: 18px;">Address</p>
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <Input :error="userFormError?.level1" v-model="user.location.level1" placeholder="da nang" label="Level 1"/>
                    <Input :error="userFormError?.level2" v-model="user.location.level2" placeholder="Cam le" label="Level 2"/>
                    <Input :error="userFormError?.level3" v-model="user.location.level3" placeholder="Hai Chau" label="Level 3"/>
                </div>
                <Input :error="userFormError?.detail" v-model="user.location.detail" style="width: 100%;" placeholder="floor 2, building 2, xxx street,..." label="Detail"/>
            </div>
            <!-- Meta -->
            <p style="font-size: 21px; font-weight: bold; margin-bottom: 18px;">Meta</p>
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                <Input :error="userFormError?.facebook_link" v-model="user.facebook_link" placeholder="Link facebook" label="Link facebook"/>
                <Input :error="userFormError?.linkedin_link" v-model="user.linkedin_link" placeholder="Link linkedin" label="Link linkedin"/>
                <Input :error="userFormError?.github_link" v-model="user.github_link" placeholder="Link github" label="Link github"/>
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
                    v-for="tool in tools" 
                    :key="tool.id"
                    :tool="tool"
                    @click="{isTechModal= true;}"
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
                    v-for="tech in techs" 
                    :key="tech.id"
                    :tech="tech"
                    @click="{isTechModal= true;}"
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
                <Product @click="isUpdateUserProductModal = true" />
            </div>
        </div>
    </div>
    <!-- Modal -->
    <AssignTechUserModal 
        v-model:tech-modal="techs" 
        :user-techs="techs" 
        :open="isTechModal" 
        @close="isTechModal = false"
    />
    <AssignTechUserModal 
        v-model:tool-modal="tools" 
        :user-tools="tools" 
        :open="isToolModal"  
        @close="isToolModal = false" 
        is-tool
    />
    <CreateUserProductModal 
        :open="isCreateUserProductModal" 
        @close="isCreateUserProductModal = false"
    />
    <UpdateUserProductModal 
        :user-product="product" 
        :open="isUpdateUserProductModal" 
        @close="isUpdateUserProductModal = false"
    />
    <UpdateOrCreateEducationModal 
        v-model="educations" 
        :user-education="editEducation" 
        :open="isEducationModal"  
        @close="isEducationModal = false" 
        :is-edit="isEditEducationModal"
    />
    <UpdateOrCreateWorkExperienceModal 
        v-model="workExperiences" 
        :user-work-experience="editWorkExperience" 
        :open="isWorkExperienceModal" 
        @close="isWorkExperienceModal = false" 
        :is-edit="isEditWorkExperienceModal"
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