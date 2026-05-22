<script setup lang="ts">
    import {ref } from 'vue';
    import { useRouter } from 'vue-router';

    import Input from '@components/ui/input/Input.vue';

    import { useUserStore } from '@stores/useUserStore';

    import type { LoginRequest } from '@type/requests';

    const router = useRouter()
    const userStore = useUserStore()

    const loginRequest = ref<LoginRequest>({
        email: '',
        password: ''
    })

    const errors = ref<any>()

    const handleSubmit = async ()=>{
        try {
            const res = await userStore.login(loginRequest.value)
            router.push('/')
        } catch (error: any) {
            errors.value = error.response?.data?.errors
        }
    }
</script>
<template>
    <form class="auth-form">
        <h1 class="auth-title">Login</h1>
        <Input :error="errors?.email?.[0]" type="email" label="Email" placeholder="user@gmail.com" v-model="loginRequest.email"/>
        <Input :error="errors?.password?.[0]" type="password" label="Password" placeholder="..." v-model="loginRequest.password"/>
        <div class="btn-group">
            <button class="btn" type="button" @click="handleSubmit">Login</button>
        </div>
    </form>
</template>
<style scoped>
    .auth-form{
        width: 500px;
        padding: 15px 42px;
        border-radius: 15px;
        background-color: white;
        box-sizing: border-box;
    }
    .auth-title{
        text-align: center;
    }
    .btn-group{
        display: flex;
        justify-content: center;
    }
    .btn{
        padding: 6px 15px;
        margin-top: 12px;
        background-color: rgb(41, 115, 228);
        border: 2px solid white;
        border-radius: 9px;
        color:white
    }
</style>