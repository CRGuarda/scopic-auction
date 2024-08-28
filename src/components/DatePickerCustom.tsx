'use client'
import { getLocalDate } from '@/lib/utils/format-date'
import { parseDateTime } from '@internationalized/date'
import { DatePicker, type DatePickerProps } from '@nextui-org/date-picker'
import { DateValue } from '@nextui-org/react'
import { useState } from 'react'

type DatePickerCustomProps = Omit<DatePickerProps, 'defaultValue' | 'minValue'> & {
  minDate?: Date
  defaultDate?: Date
}

export const DatePickerCustom = ({ name, minDate, defaultDate, ...rest }: DatePickerCustomProps) => {
  const defaultValue = parseDateTime(getLocalDate(defaultDate ?? new Date()))

  const [dateValue, setDateValue] = useState<DateValue>(defaultValue)

  const minValue = parseDateTime(getLocalDate(minDate ?? new Date()))

  return (
    <>
      <DatePicker
        variant='bordered'
        showMonthAndYearPickers
        value={dateValue}
        onChange={setDateValue}
        minValue={minValue}
        {...rest}
      />
      {dateValue && <input type='hidden' name={name} value={new Date(dateValue.toString()).toISOString()} />}
    </>
  )
}
