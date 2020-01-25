export interface Task {
  name: string
  createdAt: number
  completed: boolean
}

export interface TaskWithID extends Task {
  id: string
}
