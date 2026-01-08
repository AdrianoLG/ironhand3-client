export interface iCleaningTask {
  _id: string
  name: string
  slug: string
  img: string
}

export interface iCompletedCleaningTasks {
  _id: string
  completedAt: string
  cleaningTask: iCleaningTask
  rooms: iRooms[]
}

export interface iRooms {
  _id: string
  name: string
  slug: string
  image: string
}
