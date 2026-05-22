export interface User {
    id: string
    name: string
    email: string
    dateOfBirth: string
    gender:  "male" | "female"
    field: string
    slogan: string
    aboutMe: string
    avatar: string
    facebookLink: string
    linkedinLink: string
    githubLink: string  
    location: Location
}

export interface Tool{
    id: string
    name: string
    icon: string
}

export interface Tech{
    id: string
    name: string
    icon: string
}

export interface UserEducation{
    id: string
    name: string
    degree: string
    startDate: string
    endDate: string
    userId: string
}

export interface UserWorkExperience{
    id: string
    position: string
    organization: string
    startDate: string
    endDate: string
    userId: string
}

export interface UserProduct{
    id: string
    name: string
    description: string
    task: string
    image: string
    startDate: string
    endDate: string
    userId: string
    productLinks: ProductLink[]
    productTechs: ProductTech[]
}

export interface Location{
    province: string
    district: string
    ward: string
    detail?: string
}

// export interface UserTool{
//     id: string
//     userId: string
//     toolId : string
// }

// export interface UserTech{
//     id: string
//     userId: string
//     techId : string
// }

export interface ProductLink {
    id: string
    title: string
    url: string
}

export interface ProductTech{
    id: string
    name : string
    icon: string
}