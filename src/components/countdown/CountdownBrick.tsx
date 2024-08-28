export const CountdownBrick = ({ element, label }: { element: string; label: string }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <span className='tabular-nums text-2xl'>{element}</span>
      <span className='text-[9px]'>{label}</span>
    </div>
  )
}
