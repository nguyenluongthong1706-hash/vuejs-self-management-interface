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

// user tool
export interface AssignMultipleToolRequest{
    tools: {tool_id: string} []  
}

// user tech
export interface AssignMultipleTechRequest{
    techs: {tech_id: string} []     
}

// Education
export interface CreateEducationRequest{
    name: string
    degree: string
    start_date: Date
    end_date: Date
}


export interface UpdateEducationRequest{
    name: string
    degree: string
    start_date: Date
    end_date: Date
}

// WorkExperience
export interface CreateWorkExperienceRequest{
    position: string
    place_at: string
    start_date: Date
    end_date: Date
}


export interface UpdateWorkExperienceRequest{
    position: string
    place_at: string
    start_date: Date
    end_date: Date
}