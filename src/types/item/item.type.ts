import { items } from '@/lib/db/schemas/items'
import { Bid } from '@/types/bid/bid.type'

type InferItem = typeof items.$inferSelect

export type Item = Omit<InferItem, 'createdAt' | 'updatedAt'> & { bids?: Bid[] }

export type GetItemList = {
  results: Item[]
  totalPages: number
}
