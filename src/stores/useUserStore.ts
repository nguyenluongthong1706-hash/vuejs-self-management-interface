import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";

import { login as authLogin, logout as authLogout} from "@services/authService";

import type { User } from "@type/entities";
import type { LoginRequest } from "@type/requests";

// define store with setup function
export const useUserStore = defineStore('user',()=>{
    const toast = useToast()
    // define reactive properties 
    const savedUser = localStorage.getItem('sm-web-user');
    const user = ref<User | null>(savedUser ? JSON.parse(savedUser) : null)
    const token = ref<string | null>(localStorage.getItem('sm-web-token'));

    // define methods
    const login = async ({email,password}: LoginRequest) =>{
        try {
            const res = await authLogin({email, password})
            user.value = res.data
            token.value = res.token
            toast.success(res.message)
        } catch (error : any) {
            toast.error(error.response?.data.message)
            throw error
        }
    }

    const logout = async()=>{
        try{
            const res = await authLogout()
            user.value = null
            token.value = null
            localStorage.removeItem('sm-web-user')
            localStorage.removeItem('sm-web-token')
            toast.success(res.message)
        }catch (error : any) {
            toast.error(error.response?.data.message)
        }
        
    }
    const updateUser = (newUser : User)=>{
        user.value = newUser
    }

    const updateToken = (newToken: string) =>{
        token.value = newToken
    }

    watch(
        user,
        (newUser)=>{
            if(newUser){
                localStorage.setItem('sm-web-user', JSON.stringify(newUser))
            }else{
                localStorage.removeItem('sm-web-user')
            }
        }, { deep: true }
    )
    watch(
        token,
        (newToken)=>{
            if(newToken){
                localStorage.setItem('sm-web-token', newToken)
            }else{
                localStorage.removeItem('sm-web-token')
            }
        }, { deep: true }
    )
    
    // return all state
    return {user, token, login, logout, updateToken, updateUser}
})