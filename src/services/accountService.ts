import api from "./api";
import type { UpdateAccountRequest } from "@type/requests";
import type { GetAccountResponse, UpdateAccountResponse } from "@type/responses";

export const getAccount = async () : Promise<GetAccountResponse> =>{
    const res = await api.get<GetAccountResponse>('accounts/me')
    return res.data
}


export const updateAccount = async (updateAccountRequest: UpdateAccountRequest) : Promise<UpdateAccountResponse> =>{
    const res = await api.put<UpdateAccountResponse>('accounts/me', updateAccountRequest)
    return res.data
}
