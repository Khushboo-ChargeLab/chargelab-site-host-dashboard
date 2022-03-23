import React, { memo, useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Date-Picker.component.scss';

export interface InputProps {
    defaultDate?:Date;
    onChange?:(date:any)=>void;
    showMonthYearPicker?:boolean;
}
export const DateTimePicker = memo(
    ({
        defaultDate = new Date(),
        onChange,
        showMonthYearPicker = false,
    }: InputProps) => {
      const [startDate, setStartDate] = useState(defaultDate);

      const dateChanged = useCallback((date:any) => {
        setStartDate(date);
        onChange && onChange(date);
      }, [onChange]);

    return (
      <DatePicker
        selected={startDate}
        onChange={(date:any) => dateChanged(date)}
        dateFormat="MMM yyyy"
        showMonthYearPicker={showMonthYearPicker}
      />

    );
  },
);
