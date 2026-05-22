import type { Location, ProductLink, ProductTech } from "./entities"

export interface RegisterRequest{
    name: string
    email: string
    password: string
    passwordConfirmation: string
}


export interface LoginRequest{
    email: string
    password: string
}


export interface UpdateAccountRequest{
    name: string
    dateOfBirth: string
    gender:  "male" | "female"
    field: string
    slogan: string
    aboutMe: string
    facebookLink: string
    linkedinLink: string
    githubLink: string 
    location : Location
}

export interface UploadAvatarRequest{
    avatar: File
}


export interface CreateToolRequest{
    name: string
    icon: File
}


export interface UpdateToolRequest{
    name: string
    icon?: File
}


export interface CreateTechRequest{
    name: string
    icon: File
}


export interface UpdateTechRequest{
    name: string
    icon?: File
}

// user tool
export interface AssignToolsRequest{
    tools: {toolId: string} []  
}

// user tech
export interface AssignTechsRequest{
    techs: {techId: string} []     
}

// Education
interface EducationPayload{
    name: string
    degree: string
    startDate: string
    endDate: string
}
export type CreateEducationRequest = EducationPayload


export type UpdateEducationRequest = EducationPayload

// WorkExperience
interface WorkExperiencePayload {
    position: string
    organization: string
    startDate: string
    endDate: string
}

export type CreateWorkExperienceRequest = WorkExperiencePayload


export type UpdateWorkExperienceRequest = WorkExperiencePayload

// User Product
export interface CreateProductRequest{
    name: string
    description: string
    task: string
    image: File
    startDate: string
    endDate: string
    links: {title:string, url: string}[]
    techs: {techId: string}[]
}


export interface UpdateProductRequest{
    name: string
    description: string
    task: string
    image?: File
    startDate: string
    endDate: string
}

export interface AssignProductTechRequest{
    techs: {techId : string}[]
}

export interface CreateProductLinkRequest{
    title : string
    url: string
}

export interface UpdateProductLinkRequest{
    title : string
    url: string
}