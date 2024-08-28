import { AutoBiddingItem } from '@/types/bid/bid.type'

export const validateAutoBiddingItemInput = (userName: string, itemId: string): string | null => {
  if (!userName || typeof userName !== 'string') {
    return 'Invalid userName'
  }
  if (!itemId || typeof itemId !== 'string') {
    return 'Invalid itemId'
  }
  return null
}

export const formatAutoBiddingItemResponse = (item: AutoBiddingItem) => {
  return {
    id: item.id,
    userName: item.userName,
    itemId: item.itemId,
    isActive: item.isActive,
    createdAt: item.createdAt.toISOString(),
  }
}
