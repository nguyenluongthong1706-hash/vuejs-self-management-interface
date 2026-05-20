import api from "./api";
import type { CreateTechRequest, UpdateTechRequest, AssignTechsRequest } from "@type/requests";
import type { GetTechsResponse, CreateTechResponse, UpdateTechResponse, DeleteTechResponse, AssignTechsResponse } from "@type/responses";

export const getTechs = async () : Promise<GetTechsResponse> =>{
    const res = await api.get<GetTechsResponse>('techs')
    return res.data
}

export const getUserTechs = async () : Promise<GetTechsResponse> =>{
    const res = await api.get<GetTechsResponse>('accounts/me/techs')
    return res.data
}

export const createTech = async (createTechRequest: CreateTechRequest) : Promise<CreateTechResponse> =>{
    const formData = new FormData()
    formData.append('name', createTechRequest.name)
    if (createTechRequest.icon) {
        formData.append('icon', createTechRequest.icon)
    }

    const res = await api.post<CreateTechResponse>('techs', formData)
    return res.data
}


export const updateTech = async (id:string, updateTechRequest: UpdateTechRequest) : Promise<UpdateTechResponse> =>{
    const formData = new FormData()
    formData.append('name', updateTechRequest.name)
    if (updateTechRequest.icon) {
        formData.append('icon', updateTechRequest.icon)
    }

    const res = await api.put<UpdateTechResponse>(`techs/${id}`, formData)
    return res.data
}


export const deleteTech = async (id: string) : Promise<DeleteTechResponse> =>{
    const res = await api.delete<DeleteTechResponse>(`techs/${id}`)
    return res.data
}

export const assignTechs = async (data: AssignTechsRequest) : Promise<AssignTechsResponse> =>{
    const res = await api.post<AssignTechsResponse>('accounts/me/techs', data)
    return res.data
}
