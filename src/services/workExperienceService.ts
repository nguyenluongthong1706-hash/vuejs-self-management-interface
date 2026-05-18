import api from "./api";
import type { CreateWorkExperienceRequest, UpdateWorkExperienceRequest } from "@type/requests";
import type { GetUserWorkExperienceResponse, CreateWorkExperienceResponse, UpdateWorkExperienceResponse, DeleteWorkExperienceResponse } from "@type/responses";

export const getUserWorkExperience = async () : Promise<GetUserWorkExperienceResponse> =>{
    const res = await api.get<GetUserWorkExperienceResponse>('accounts/me/work-experience')
    return res.data
}

export const createWorkExperience = async (createWorkExperienceRequest: CreateWorkExperienceRequest) : Promise<CreateWorkExperienceResponse> =>{
    const res = await api.post<CreateWorkExperienceResponse>('accounts/me/work-experience', createWorkExperienceRequest)
    return res.data
}


export const updateWorkExperience = async (id:string, updateWorkExperienceRequest: UpdateWorkExperienceRequest) : Promise<UpdateWorkExperienceResponse> =>{
    const res = await api.put<UpdateWorkExperienceResponse>(`accounts/me/work-experience/${id}`, updateWorkExperienceRequest)
    return res.data
}


export const deleteWorkExperience = async (id: string) : Promise<DeleteWorkExperienceResponse> =>{
    const res = await api.delete<DeleteWorkExperienceResponse>(`accounts/me/work-experience/${id}`)
    return res.data
}
