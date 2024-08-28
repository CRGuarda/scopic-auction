'use client'

import { useFetcher } from '@/hooks/useFetcher'
import { GetItemList } from '@/types/item/item.type'
import { SortDescriptor } from '@nextui-org/react'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

export const useItems = () => {
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState<'asc' | 'desc' | null>(null)
  const [sortController, setSortController] = useState<{}>({})
  const [search, setSearch] = useState('')
  const [searchValue] = useDebounce(search, 250)
  const [id, setId] = useState('')

  const { data, isLoading, error, mutate } = useFetcher<GetItemList>(
    `/api/items?page=${page}&order=${order}&search=${searchValue}&id=${id}`
  )

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handleOrder = (descriptor: SortDescriptor) => {
    setSortController(descriptor)
    descriptor.direction === 'ascending' ? setOrder('asc') : setOrder('desc')
  }

  const loadingState = isLoading || data?.results?.length === 0 ? 'loading' : 'idle'

  return {
    setId,
    mutate,
    sortController,
    page,
    totalPages: data?.totalPages || 0,
    handlePageChange,
    handleOrder,
    setSearch,
    isLoading,
    loadingState,
    results: data?.results || [],
    bids: data?.results?.[0]?.bids || [],
    error,
  }
}
