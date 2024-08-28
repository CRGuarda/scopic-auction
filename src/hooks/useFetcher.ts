import useSWR from 'swr'

const fetcher = (arg: any, ...args: any[]) => fetch(arg, ...args).then((res) => res.json())

export const useFetcher = <T>(url: string) => {
  const methods = useSWR<T>(url, fetcher, {
    keepPreviousData: true,
  })
  return { ...methods }
}
