export interface Item {
  name: string
  completed: boolean
}

export interface ItemWithID extends Item {
  id: string
}
