<script setup lang="ts">
    import { ref } from "vue";

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

    import type { UserProduct } from "@type/entities";

    const name = ref<string>("")

    const isToolModal = ref<boolean>(false)
    const isTechModal = ref<boolean>(false)
    const isCreateUserProductModal = ref<boolean>(false)
    const isUpdateUserProductModal = ref<boolean>(false)
    const isEducationModal = ref<boolean>(false)
    const isWorkExperienceModal = ref<boolean>(false)

    const product = {
        id:'', 
        name: 'product', 
        description:'description....', 
        task:'task....', image:'http://...',
        start_date: new Date(), 
        end_date: new Date(), 
        user_id:'e01', 
        product_techs:[{id:'p1', tech_id :'te1', title: 'java', logo:''},{id:'p2', tech_id :'te2', title: 'python', logo:''}],
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
                <Input v-model="name" placeholder="N.L.T" label="Name"/>
                <Input v-model="name" label="Date of birth" type="date"/>
                <Input v-model="name" label="Gender" type="radio" :optional-values="[{key: 'male', value: 'Male'},{key:'female', value: 'Female'}]"/>
            </div>
            <div>{{ new Date(name) }}</div>
            <!-- Other info -->
            <Input v-model="name" placeholder="user@gmail.com" label="Email" type="email" readonly/>
            <Input v-model="name" placeholder="Information technology" label="Field"/>
            <Input v-model="name" placeholder="Try and try" label="Slogan"/>
            <Textarea v-model="name" placeholder="I am ...." label="About me"/>
            <!-- Address -->
            <div>
                <p style="font-size: 21px; font-weight: bold; margin-bottom: 18px;">Address</p>
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                    <Input v-model="name" placeholder="da nang" label="Level 1"/>
                    <Input v-model="name" placeholder="Cam le" label="Level 2"/>
                    <Input v-model="name" placeholder="Hai Chau" label="Level 3"/>
                </div>
                <Input v-model="name" style="width: 100%;" placeholder="floor 2, building 2, xxx street,..." label="Detail"/>
            </div>
            <button class="btn">Edit</button>
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