import { createNotification } from '@/lib/services/notifications'

export const calculateNewBidAmount = (currentPrice: number, maxBidAmount: number) => {
  const bidIncrement = 1
  return Math.min(currentPrice + bidIncrement, maxBidAmount)
}

export const checkAlertThreshold = async (
  userName: string,
  totalBids: number,
  maxBidAmount: number,
  alertPercentage: number
) => {
  if (totalBids >= maxBidAmount * (alertPercentage / 100)) {
    await createNotification(userName, `You've reached ${alertPercentage}% of your maximum bid amount.`, 'bid_alert')
  }
}
