export interface SubjectResponse {
  id: string
  code: string
  name: string
  description: string | null
  credits: number
}

export interface CreateSubjectRequest {
  code: string         
  name: string         
  description?: string 
  credits: number      
}

export interface UpdateSubjectRequest {
  name: string
  description?: string
  credits: number
}