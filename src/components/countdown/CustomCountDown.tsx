import { CountdownBrick } from '@/components/countdown/CountdownBrick'
import { EndMessage } from '@/components/countdown/EndMessage'
import Countdown, { CountdownProps, CountdownRendererFn } from 'react-countdown'

const renderer: CountdownRendererFn = ({ hours, minutes, seconds, completed }) => {
  const hoursPadded = hours.toString().padStart(2, '0')
  const minutesPadded = minutes.toString().padStart(2, '0')
  const secondsPadded = seconds.toString().padStart(2, '0')
  if (completed) return <EndMessage />

  return (
    <div className='flex gap-1 p-2 border rounded-lg w-max h-full'>
      <CountdownBrick element={hoursPadded} label='hours' />
      <span className='pt-[1.5px]'>:</span>
      <CountdownBrick element={minutesPadded} label='min' />
      <span className='pt-[1.5px]'>:</span>
      <CountdownBrick element={secondsPadded} label='sec' />
    </div>
  )
}

export const CustomCountDown = ({ date, ...rest }: CountdownProps) => {
  return (
    <div className='flex flex-col gap-1 h-full'>
      <span className='text-sm'>Auction ends in</span>
      <Countdown date={date} renderer={renderer} daysInHours {...rest} />
    </div>
  )
}
