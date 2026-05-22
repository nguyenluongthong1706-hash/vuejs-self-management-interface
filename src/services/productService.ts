import api from "./api"
import type { CreateProductRequest, UpdateProductRequest , AssignProductTechRequest, CreateProductLinkRequest, UpdateProductLinkRequest } from "@type/requests"
import type { GetUserProductResponse, CreateProductResponse, UpdateProductResponse, DeleteProductResponse, AssignProductTechResponse, UnassignProductTechResponse, CreateProductLinkResponse, UpdateProductLinkResponse, DeleteProductLinkResponse } from "@type/responses"

export const getUserProduct = async () :Promise<GetUserProductResponse> => {
    const res = await api.get<GetUserProductResponse>('accounts/me/product')
    return res.data
}

export const createProduct = async (data: CreateProductRequest) :Promise<CreateProductResponse> => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('task', data.task)
    formData.append('startDate', data.startDate)
    formData.append('endDate', data.endDate)
    formData.append('image', data.image)

    data.links.forEach((link, index) => {
        formData.append(`links[${index}][title]`, link.title)
        formData.append(`links[${index}][url]`, link.url)
    })

    data.techs.forEach((tech, index) => {
        formData.append(`techs[${index}][techId]`, tech.techId)
    })

    const res = await api.post<CreateProductResponse>(
        'accounts/me/product',
        formData
    )

    return res.data
}

export const updateProduct = async (id: string, data: UpdateProductRequest) :Promise<UpdateProductResponse> => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('task', data.task)
    formData.append('startDate', data.startDate)
    formData.append('endDate', data.endDate)
    if(data?.image){
        formData.append('image', data.image)
    }

    const res = await api.put<UpdateProductResponse>(`accounts/me/product/${id}`, formData)
    return res.data
}

export const deleteProduct = async (id: string) :Promise<DeleteProductResponse> => {
    const res = await api.delete<DeleteProductResponse>(`accounts/me/product/${id}`)
    return res.data
}

export const assignTechs = async (idProduct: string, data : AssignProductTechRequest) :Promise<AssignProductTechResponse> => {
    const res = await api.post<AssignProductTechResponse>(`accounts/me/product/${idProduct}/techs`, data)
    return res.data
}

export const unassignProductTech = async (idProduct: string, idTech: string) :Promise<UnassignProductTechResponse> => {
    const res = await api.delete<UnassignProductTechResponse>(`accounts/me/product/${idProduct}/tech/${idTech}`)
    return res.data
}

export const createProductLink = async (idProduct: string, data : CreateProductLinkRequest) :Promise<CreateProductLinkResponse> => {
    console.log(data)
    const res = await api.post<CreateProductLinkResponse>(`accounts/me/product/${idProduct}/link`, data)
    return res.data
}

export const updateProductLink = async (idProductLink: string, data : UpdateProductLinkRequest) :Promise<UpdateProductLinkResponse> => {
    const res = await api.put<UpdateProductLinkResponse>(`accounts/me/product/link/${idProductLink}`, data)
    return res.data
}

export const deleteProductLink = async (idProductLink: string) :Promise<DeleteProductLinkResponse> => {
    const res = await api.delete<DeleteProductLinkResponse>(`accounts/me/product/link/${idProductLink}`)
    return res.data
}
