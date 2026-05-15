export interface RegisterRequest{
    name: string
    email: string
    password: string
    password_confirmation: string
}


export interface LoginRequest{
    email: string
    password: string
}


export interface UpdateAccountRequest{
    name: string
    date_of_birth: Date
    gender:  "male" | "female"
    field: string
    slogan: string
    about_me: string
    facebook_link: string
    linkedin_link: string
    github_link: string 
    level1: string 
    level2: string 
    level3: string 
    detail?: string  
}


export interface CreateToolRequest{
    name: string
    icon: File | null
}


export interface UpdateToolRequest{
    name: string
    icon?: File
}


export interface CreateTechRequest{
    name: string
    icon: File | null
}


export interface UpdateTechRequest{
    name: string
    icon?: File
}