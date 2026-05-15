<script setup lang="ts">
    import { ref } from "vue";
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

    import type { UserProduct, User } from "@type/entities";

    import { getAccount, updateAccount } from "@services/accountService";

    import { useUserStore } from "@stores/useUserStore";

    const toast = useToast()
    const userStore = useUserStore()

    const isToolModal = ref<boolean>(false)
    const isTechModal = ref<boolean>(false)
    const isCreateUserProductModal = ref<boolean>(false)
    const isUpdateUserProductModal = ref<boolean>(false)
    const isEducationModal = ref<boolean>(false)
    const isWorkExperienceModal = ref<boolean>(false)

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
    
    const fetchData = async () =>{
        try {
            const userRes = await getAccount()
            user.value = userRes.data
            toast.success(userRes.message)
        } catch (error:any) {
            toast.error(error.response?.data?.message || "get account fail")
        }
    }

    fetchData()

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
                <Tech/>
            </div>
        </div>
        <!-- Tech Stack -->
        <div class="box">
            <div class="box-header">
                <p class="title">Languages and frameworks</p>
                <button class="btn" @click="isTechModal = true">Assign tech</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap:12px;">
                <Tech/>
            </div>
        </div>
        <!-- Educations -->
        <div class="box">
            <div class="box-header">
                <p class="title">Educations</p>
                <button class="btn" @click="isEducationModal = true">Add new</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                <Education/>
            </div>
        </div>
        <!-- Work Experiences -->
        <div class="box">
            <div class="box-header">
                <p class="title">Work Experiences</p>
                <button class="btn" @click="isWorkExperienceModal = true">Add new</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                <Experience/>
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
    <AssignTechUserModal :open="isTechModal" @close="isTechModal = false"></AssignTechUserModal>
    <AssignTechUserModal :open="isToolModal"  @close="isToolModal = false" is-tool></AssignTechUserModal>
    <CreateUserProductModal :open="isCreateUserProductModal" @close="isCreateUserProductModal = false"></CreateUserProductModal>
    <UpdateUserProductModal :user-product="product" :open="isUpdateUserProductModal" @close="isUpdateUserProductModal = false"></UpdateUserProductModal>
    <UpdateOrCreateEducationModal :open="isEducationModal"  @close="isEducationModal = false"></UpdateOrCreateEducationModal>
    <UpdateOrCreateWorkExperienceModal :open="isWorkExperienceModal"  @close="isWorkExperienceModal = false" is-tool></UpdateOrCreateWorkExperienceModal>
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