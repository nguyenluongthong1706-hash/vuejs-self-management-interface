import api from "./api";
import type { RegisterRequest, LoginRequest } from "@type/requests";
import type { RegisterResponse, LoginResponse, LogoutResponse } from "@type/responses";

export const register = async (registerRequest: RegisterRequest) : Promise<RegisterResponse> =>{
    const res = await api.post<RegisterResponse>('auth/register',registerRequest)
    return res.data
}


export const login = async (loginRequest: LoginRequest) : Promise<LoginResponse> =>{
    const res = await api.post<LoginResponse>('auth/login', loginRequest)
    return res.data
}


export const logout = async () : Promise<LogoutResponse> =>{
    const res = await api.post<LogoutResponse>('auth/login')
    return res.data
}