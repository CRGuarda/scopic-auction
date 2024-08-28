import { NextRequest, NextResponse } from 'next/server'
import { getAutoBiddingConfig } from '@/lib/services/auto-bidding/queries'
import { auth } from '@/lib/auth'
import { configureAutoBidding, processAutoBidding } from '@/lib/services/auto-bidding'

export async function GET() {
  const session = await auth()

  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const config = await getAutoBiddingConfig(session.user.name)
    return NextResponse.json({ success: true, config })
  } catch (error) {
    console.error('Error fetching auto-bidding configuration:', error)
    return NextResponse.json({ error: 'Failed to fetch auto-bidding configuration' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { itemId, currentPrice } = await request.json()

    if (!itemId || typeof currentPrice !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    await processAutoBidding(itemId, currentPrice)

    return NextResponse.json({ success: true, message: 'Auto-bidding process completed successfully' })
  } catch (error: any) {
    console.error('Error processing auto-bids:', error)
    return NextResponse.json({ error: 'Failed to process auto-bids' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await request.formData()
    const { maxBidAmount, alertPercentage } = Object.fromEntries(formData.entries())

    const result = await configureAutoBidding(session.user.name, Number(maxBidAmount), Number(alertPercentage))

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error configuring auto-bidding:', error)
    return NextResponse.json({ error: 'Failed to configure auto-bidding' }, { status: 500 })
  }
}
