import { autoBiddingItems } from '@/lib/db/schemas/auto-bidding-items'
import { bids } from '@/lib/db/schemas/bids'

export type Bid = typeof bids.$inferSelect

export type AutoBiddingItem = typeof autoBiddingItems.$inferSelect

export type GetActiveAutoBiddingItem = {
  success: boolean
  items: AutoBiddingItem[]
}

export type AutoBidConfig = {
  success: boolean
  config: Config
}

export type Config = {
  id: string
  userName: string
  maxBidAmount: number
  alertPercentage: number
  reservedAmount: number
  createdAt: Date
  updatedAt: Date
}
