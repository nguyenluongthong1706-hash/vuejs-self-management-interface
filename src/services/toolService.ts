import api from "./api";
import type { CreateToolRequest, UpdateToolRequest } from "@type/requests";
import type { GetToolsResponse, CreateToolResponse, UpdateToolResponse, DeleteToolResponse } from "@type/responses";

export const getTools = async () : Promise<GetToolsResponse> =>{
    const res = await api.get<GetToolsResponse>('tools')
    return res.data
}


export const createTool = async (createToolRequest: CreateToolRequest) : Promise<CreateToolResponse> =>{
    const formData = new FormData()
    formData.append('name', createToolRequest.name)
    if (createToolRequest.icon) {
        formData.append('icon', createToolRequest.icon)
    }

    const res = await api.post<CreateToolResponse>('tools', formData)
    return res.data
}


export const updateTool = async (id: string, updateToolRequest: UpdateToolRequest) : Promise<UpdateToolResponse> =>{
    const formData = new FormData()
    formData.append('name', updateToolRequest.name)
    if (updateToolRequest.icon) {
        formData.append('icon', updateToolRequest.icon)
    }

    const res = await api.put<UpdateToolResponse>(`tools/${id}`, formData)
    return res.data
}


export const deleteTool = async (id: string) : Promise<DeleteToolResponse> =>{
    const res = await api.delete<DeleteToolResponse>(`tools/${id}`)
    return res.data
}
