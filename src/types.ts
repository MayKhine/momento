export interface TodoType {
  id: string
  title: string
  done: boolean
}

export interface ProjectType {
  id: string
  title: string
  slug: string
  description: string
  createdAt: string
  dueDate?: Date
}
