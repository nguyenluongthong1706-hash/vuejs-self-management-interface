export interface Tool{
    id: string
    title: string
    logo: string
}

export interface Tech{
    id: string
    title: string
    logo: string
}

export interface UserTool{
    id: string
    user_id: string
    tool_id : string
}

export interface UserTech{
    id: string
    user_id: string
    tech_id : string
}

export interface UserProduct{
    id: string
    name: string
    description: string
    task: string
    image: string
    start_date: Date
    end_date: Date
    user_id: string
    product_urls: ProductUrl[]
    product_techs: ProductTech[]

}

export interface ProductUrl {
    id: string
    title: string
    link: string
}

export interface ProductTech{
    id: string
    tech_id : string
    title : string
    logo: string
}

export interface UserEducation{
    id: string
    name: string
    degree: string
    start_date: Date
    end_date: Date
    user_id: string
}

export interface UserWorkExperience{
    id: string
    position: string
    place_at: string
    start_date: Date
    end_date: Date
    user_id: string
}