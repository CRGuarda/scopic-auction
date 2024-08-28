export type NotificationElement = {
  id: string
  userName: string
  message: string
  type: string
  isRead: boolean
  createdAt: Date
}

export type Notifications = {
  success: boolean
  notifications: NotificationElement[]
}
