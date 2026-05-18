import api from "./api";
import type { CreateEducationRequest, UpdateEducationRequest } from "@type/requests";
import type { GetUserEducationResponse, CreateEducationResponse, UpdateEducationResponse, DeleteEducationResponse } from "@type/responses";

export const getUserEducation = async () : Promise<GetUserEducationResponse> =>{
    const res = await api.get<GetUserEducationResponse>('accounts/me/education')
    return res.data
}

export const createEducation = async (createEducationRequest: CreateEducationRequest) : Promise<CreateEducationResponse> =>{
    const res = await api.post<CreateEducationResponse>('accounts/me/education', createEducationRequest)
    return res.data
}


export const updateEducation = async (id:string, updateEducationRequest: UpdateEducationRequest) : Promise<UpdateEducationResponse> =>{
    const res = await api.put<UpdateEducationResponse>(`accounts/me/education/${id}`, updateEducationRequest)
    return res.data
}


export const deleteEducation = async (id: string) : Promise<DeleteEducationResponse> =>{
    const res = await api.delete<DeleteEducationResponse>(`accounts/me/education/${id}`)
    return res.data
}
