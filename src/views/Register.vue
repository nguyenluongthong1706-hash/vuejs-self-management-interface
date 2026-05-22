<script setup lang="ts">
    import {ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    import Input from '@components/ui/input/Input.vue';

    import { register } from '@services/authService';

    import type { RegisterRequest } from '@type/requests';
    import type { FormErrors } from "@type/responses"

    const router = useRouter()
    const toast = useToast()

    const isLoading = ref(false)

    const registerRequest = ref<RegisterRequest>({
        name : '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })

    const errors = ref<FormErrors>()

    const handleSubmit = async ()=>{
        if (isLoading.value) return
        try {
            isLoading.value = true
            errors.value = {}
            
            const res = await register(registerRequest.value)
            toast.success(res.message)
            router.push('/auth/login')
        } catch (error: any) {
            errors.value = error.response?.data?.errors
            toast.error(error.response?.data?.message || "Login fail")
        }finally {
            isLoading.value = false
        }
    }
</script>
<template>
    <form class="auth-form">
        <h1 class="auth-title">Register</h1>
        <Input :error="errors?.name?.[0]" label="Name" placeholder="Nguyen Van B" v-model="registerRequest.name"/>
        <Input :error="errors?.email?.[0]" type="email" label="Email" placeholder="user@gmail.com" v-model="registerRequest.email"/>
        <Input :error="errors?.password?.[0]" type="password" label="Password" placeholder="..." v-model="registerRequest.password"/>
        <Input :error="errors?.passwordConfirmation?.[0]" type="password" label="Confirm password" placeholder="..." v-model="registerRequest.passwordConfirmation"/>
        <div class="btn-group">
            <button class="btn" type="button" :disabled="isLoading" @click="handleSubmit">
                {{ isLoading ? "Loading..." : "Register" }}
            </button>
        </div>
        <p class="auth-link">
            Already have an account?
            <button type="button" @click="router.push('/auth/login')">Login</button>
        </p>
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
    .auth-link {
        margin-top: 12px;
        text-align: center;
    }
    .auth-link button {
        border: none;
        background: transparent;
        color: rgb(41, 115, 228);
        cursor: pointer;
        font-weight: 600;
    }
</style>
