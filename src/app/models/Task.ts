export interface Task {
  name: string
  completed: boolean
}

export interface TaskWithID extends Task {
  id: string
}
