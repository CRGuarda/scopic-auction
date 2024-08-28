import { autoBiddingConfig } from '@/lib/db/schemas/auto-bidding-config'
import {
  getAutoBidders,
  placeBidTransaction,
  getAutoBiddingConfig,
  updateAutoBiddingConfig,
  updateReservedAmount,
  getAvailableBidAmount,
} from './queries'
import { calculateNewBidAmount, checkAlertThreshold } from './utils'
import { createNotification } from '@/lib/services/notifications'
import { db } from '@/lib/db'
import { getLastBid } from '@/lib/services/bids/queries'

export const processAutoBidding = async (itemId: string, currentPrice: number) => {
  const autoBidders = await getAutoBidders(itemId, currentPrice)
  const lastBid = await getLastBid(itemId)

  for (const bidder of autoBidders) {
    if (lastBid && lastBid.userName === bidder.userName) continue
    const availableBidAmount = await getAvailableBidAmount(bidder.userName)

    if (availableBidAmount <= 0) {
      await createNotification(
        bidder.userName,
        'Your auto-bidding has stopped due to reaching your maximum bid amount.',
        'auto_bid_stopped'
      )
      continue
    }

    const newBidAmount = calculateNewBidAmount(currentPrice, availableBidAmount)

    if (newBidAmount > currentPrice) {
      try {
        const updatedPrice = await placeBidTransaction(bidder.userName, itemId, newBidAmount)
        const [{ newReservedAmount }] = await updateReservedAmount(bidder.userName, newBidAmount)

        const config = await getAutoBiddingConfig(bidder.userName)
        if (config) {
          await checkAlertThreshold(bidder.userName, newReservedAmount, config.maxBidAmount, config.alertPercentage)
        }

        // Recursively call processAutoBidding to allow other users to respond
        await processAutoBidding(itemId, updatedPrice)
        break // Exit after the first successful auto-bid
      } catch (error: any) {
        console.error(`Auto-bid failed for user ${bidder.userName}:`, error)
        await createNotification(bidder.userName, `Auto-bid failed: ${error.message}`, 'auto_bid_error')
        // Continue to the next bidder if this one fails
      }
    }
  }
}

export const configureAutoBidding = async (userName: string, maxBidAmount: number, alertPercentage: number) => {
  const existingConfig = await getAutoBiddingConfig(userName)

  if (existingConfig) {
    await updateAutoBiddingConfig(userName, maxBidAmount, alertPercentage)
  } else {
    await db.insert(autoBiddingConfig).values({ userName, maxBidAmount, alertPercentage, reservedAmount: 0 })
  }

  return { success: true, message: 'Auto-bidding configuration updated successfully' }
}
