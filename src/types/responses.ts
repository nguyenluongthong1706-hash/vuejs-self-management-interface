import type { User, Tool, Tech } from "./entities"

export interface RegisterResponse{
    message : string
}

export interface LoginResponse{
    message : string
    token : string
    data : User
}

export interface LogoutResponse{
    message : string
}

// account response
export interface GetAccountResponse{
    message : string
    data : User
}

export interface UpdateAccountResponse{
    message : string
    data : User
}

// tool response
export interface GetToolsResponse{
    message : string
    data : Tool[]
}


export interface CreateToolResponse{
    message : string
    data : Tool
}


export interface UpdateToolResponse{
    message : string
    data : Tool
}


export interface DeleteToolResponse{
    message : string
}

// tech response
export interface GetTechsResponse{
    message : string
    data : Tech[]
}


export interface CreateTechResponse{
    message : string
    data : Tech
}


export interface UpdateTechResponse{
    message : string
    data : Tech
}


export interface DeleteTechResponse{
    message : string
}
