import { DatePicker } from '@heroui/react'
import { I18nProvider } from "@react-aria/i18n";

import type { DatePickerComponentProps } from '../types'

export const DatePickerComponent = ({ selectedDate, onDateChange }: DatePickerComponentProps) => {
    return (
        <div className="flex-1">
            <I18nProvider locale="en-GB">
                <DatePicker
                    label="Select Date"
                    labelPlacement='outside'
                    // @ts-expect-error: Type incompatibility, but works
                    value={selectedDate}
                    onChange={(date) => onDateChange(date)}
                    showMonthAndYearPickers
                    firstDayOfWeek='mon'
                    className="w-full"
                />
            </I18nProvider>
        </div>
    )
}
