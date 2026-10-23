export interface iProjectInfo {
  headers: {
    title: string
    url: string
  }[]
  projects: iProject[]
}

export interface iProject {
  _id: string
  title: string
  description?: string
  shared: boolean
  category: string
  tasks?: iTask[]
  owner?: { _id: string; name?: string; email: string }
}

export type iTaskStatus = 'TODO' | 'DOING' | 'DONE'
export type iTaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface iTaskSubtask {
  title: string
  completed: boolean
}

export interface iTaskAssignedUser {
  _id: string
  name?: string
  email?: string
}

export interface iTask {
  _id: string
  title: string
  description?: string
  priority?: iTaskPriority
  tags?: string[]
  subtasks?: iTaskSubtask[]
  asignedTo?: iTaskAssignedUser | null
  status: iTaskStatus
  completed: boolean
}

export interface iProjectFormInput {
  title: string
  description?: string
  shared: boolean
  category: string
}
