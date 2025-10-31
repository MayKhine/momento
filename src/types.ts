export interface TodoType {
  id: string
  title: string
  done: boolean
}

export interface ProjectType {
  id: string
  title: string
  description: string
  createdAt?: Date
  dueDate?: Date
}
