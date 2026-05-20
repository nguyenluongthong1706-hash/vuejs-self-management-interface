<script setup lang="ts">
    import {ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import Input from '@components/ui/input/Input.vue';

    import { register } from '@services/authService';

    import type { RegisterRequest } from '@type/requests';

    const router = useRouter()
    const toast = useToast()

    const registerRequest = ref<RegisterRequest>({
        name : '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })

    const errors = ref<any>()

    const handleSubmit = async ()=>{
        try {
            const res = await register(registerRequest.value)
            toast.success(res.message)
            router.push('/auth/login')
        } catch (error: any) {
            errors.value = error.response?.data?.errors
            toast.error(error.response?.data?.message || "Login fail")
        }
    }
</script>
<template>
    <form class="auth-form">
        <h1 class="auth-title">Register</h1>
        <Input :error="errors?.name" label="Name" placeholder="Nguyen Van B" v-model="registerRequest.name"/>
        <Input :error="errors?.email" type="email" label="Email" placeholder="user@gmail.com" v-model="registerRequest.email"/>
        <Input :error="errors?.password" type="password" label="Password" placeholder="..." v-model="registerRequest.password"/>
        <Input :error="errors?.passwordConfirmation" type="password" label="Confirm password" placeholder="..." v-model="registerRequest.passwordConfirmation"/>
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