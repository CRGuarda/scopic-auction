import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import {
  getAutoBiddingItems,
  removeAutoBiddingForItem,
  toggleAutoBiddingForItem,
} from '@/lib/services/auto-bidding-items'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const items = await getAutoBiddingItems(session.user.name)
    return NextResponse.json({ success: true, items })
  } catch (error) {
    console.error('Error fetching auto-bidding items:', error)
    return NextResponse.json({ error: 'Failed to fetch auto-bidding items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const itemId = searchParams.get('itemId')
    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }

    const updatedItem = await toggleAutoBiddingForItem(session.user.name, itemId)
    return NextResponse.json({ success: true, item: updatedItem })
  } catch (error) {
    console.error('Error toggling auto-bidding for item:', error)
    return NextResponse.json({ error: 'Failed to toggle auto-bidding for item' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Auto-bidding item ID is required' }, { status: 400 })
    }

    const deletedItem = await removeAutoBiddingForItem(id)
    return NextResponse.json({ success: true, item: deletedItem })
  } catch (error) {
    console.error('Error removing auto-bidding for item:', error)
    return NextResponse.json({ error: 'Failed to remove auto-bidding for item' }, { status: 500 })
  }
}
