import { db } from '@/lib/db'
import { eq, sql } from 'drizzle-orm'
import { buildWhereClause, buildOrderByClause, RESULTS_PER_PAGE, validateInsertItem, validateUpdateItem } from './utils'
import { items } from '@/lib/db/schemas/items'

export const getItemsCount = async (whereClause: ReturnType<typeof buildWhereClause>) => {
  const [itemsCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(items)
    .where(whereClause)
  return itemsCount.count
}

export const getItemsPage = async (
  whereClause: ReturnType<typeof buildWhereClause>,
  orderByClause: ReturnType<typeof buildOrderByClause>,
  page: number,
  id: string | null
) => {
  return db.query.items.findMany({
    limit: RESULTS_PER_PAGE,
    offset: Math.max((page - 1) * RESULTS_PER_PAGE, 0),
    columns: {
      createdAt: false,
      updatedAt: false,
    },
    with: {
      bids: id
        ? {
            columns: {
              id: true,
              userName: true,
              bidAmount: true,
            },
            orderBy: (bids, { desc }) => desc(bids.bidAmount),
          }
        : undefined,
    },
    where: whereClause,
    orderBy: orderByClause,
  })
}

export const insertItem = async (item: ReturnType<typeof validateInsertItem>) => await db.insert(items).values(item)

export const updateItem = async (id: string, data: ReturnType<typeof validateUpdateItem>) => {
  return db.update(items).set(data).where(eq(items.id, id)).returning()
}

export const deleteItem = async (id: string) => {
  return db.delete(items).where(eq(items.id, id))
}
