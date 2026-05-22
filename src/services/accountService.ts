import api from "./api";
import type { UpdateAccountRequest, UploadAvatarRequest } from "@type/requests";
import type { GetAccountResponse, UpdateAccountResponse, UploadAvatarResponse } from "@type/responses";

export const getAccount = async () : Promise<GetAccountResponse> =>{
    const res = await api.get<GetAccountResponse>('accounts/me')
    return res.data
}


export const updateAccount = async (updateAccountRequest: UpdateAccountRequest) : Promise<UpdateAccountResponse> =>{
    const res = await api.put<UpdateAccountResponse>('accounts/me', updateAccountRequest)
    return res.data
}

export const uploadAvatar = async (uploadAvatarRequest: UploadAvatarRequest) : Promise<UploadAvatarResponse> =>{
    const formData = new FormData
    formData.append('avatar', uploadAvatarRequest.avatar)
    const res = await api.put<UploadAvatarResponse>('accounts/me/avatar', formData)
    return res.data
}
