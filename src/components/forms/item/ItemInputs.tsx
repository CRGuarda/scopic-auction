'use client'
import { Input, type InputProps } from '@nextui-org/input'
import { useEffect, useState } from 'react'

type PriceInputProps = Omit<InputProps, 'value' | 'onValueChange'> & {
  getValueChanged?: (value: string) => void
}

export const PriceInput = ({ getValueChanged, defaultValue, ...rest }: PriceInputProps) => {
  const [value, setValue] = useState(defaultValue ?? '')

  const handleInputChange = (inputValue: string) => {
    if (/^\d*$/.test(inputValue)) {
      setValue(inputValue)
    }
  }

  useEffect(() => {
    getValueChanged && getValueChanged(value)
  }, [value, getValueChanged])

  return (
    <Input
      type='text'
      placeholder='55'
      value={value}
      onValueChange={handleInputChange}
      startContent={
        <div className='pointer-events-none flex items-center'>
          <span className='text-default-400 text-small'>$</span>
        </div>
      }
      {...rest}
    />
  )
}
