export interface TodoType {
  taskId: string
  task: string
  complete: boolean
}

export interface ProjectType {
  id: string
  title: string
  slug: string
  description: string
  createdAt: string
  dueDate?: Date
}
