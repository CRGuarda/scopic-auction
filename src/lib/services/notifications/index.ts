import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schemas/notifications'
import { eq, and } from 'drizzle-orm'

export const createNotification = async (userName: string, message: string, type: string) => {
  return db.insert(notifications).values({ userName, message, type }).returning()
}

export const getUserNotifications = async (userName: string) => {
  return await db.query.notifications.findMany({
    where: eq(notifications.userName, userName),
    orderBy: (notifications, { desc }) => desc(notifications.createdAt),
  })
}

export const markNotificationAsRead = async (id: string) => {
  return db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id)).returning()
}

export const deleteNotification = async (id: string, userName: string) => {
  return db
    .delete(notifications)
    .where(and(eq(notifications.id, id), eq(notifications.userName, userName)))
    .returning()
}
