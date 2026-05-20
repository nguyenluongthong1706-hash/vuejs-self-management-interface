import type { User, Tool, Tech, UserEducation, UserWorkExperience } from "./entities"

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

// user tool
export interface AssignToolsResponse{
    message: string   
    data : Tool [] 
}


export interface UnAssignToolResponse{
    message: string
}

// user tech
export interface AssignTechsResponse{
    message: string  
    data : Tech []  
}


export interface UnAssignTechResponse{
    message: string
}

// Education
export interface GetUserEducationResponse{
    message : string
    data : UserEducation[]
}


export interface CreateEducationResponse{
    message : string
    data : UserEducation
}


export interface UpdateEducationResponse{
    message : string
    data : UserEducation
}


export interface DeleteEducationResponse{
    message : string
}

// WorkExperience
export interface GetUserWorkExperienceResponse{
    message : string
    data : UserWorkExperience[]
}


export interface CreateWorkExperienceResponse{
    message : string
    data : UserWorkExperience
}


export interface UpdateWorkExperienceResponse{
    message : string
    data : UserWorkExperience
}

export interface DeleteWorkExperienceResponse{
    message : string
}