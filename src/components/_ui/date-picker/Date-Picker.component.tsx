/* eslint-disable react/jsx-wrap-multilines */
import React, { forwardRef, memo, useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subWeeks, subMonths } from 'date-fns';
import {
  arrowLeft,
  arrowRight,
  chevdown,
  chevnext,
  chevpre,
  close,
} from '../../../lib';
import {
  formatDate,
  addMonths,
  differenceInDays,
  addDays,
} from '../../../utils/Date.Util';
import './Date-Picker.component.scss';

export interface InputProps {
  defaultDate?: Date;
  format?: string;
  onChange?: (date: any) => void;
  showMonthYearPicker?: boolean;
  inputBG?: string;
  maxDate?: Date | null;
}

export const DateTimePicker = memo(
  ({
    defaultDate = new Date(),
    onChange,
    showMonthYearPicker = false,
    format = 'MMM yyyy',
    inputBG = 'bg-silver',
    maxDate = null,
  }: InputProps) => {
    const [selectedDate, setSelectedDate] = useState(defaultDate);

    const DateCustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
      return (
        <button
          className={`react-datepicker__input-container-button ${inputBG}`}
          onClick={onClick}
          ref={ref}
        >
          <div className='block'>
            <div className='inline-block text-grey6'>{value}</div>
            <div className='inline-block align-middle pl-4 pr-2'>
              <img src={chevdown} alt='' />
            </div>
          </div>
        </button>
      );
    });

    const onDateChanged = useCallback(
      (date: any) => {
        setSelectedDate(date);
        onChange && onChange(date);
      },
      [onChange],
    );

    const renderArrow = (arraw: any) => {
      return (
        <img src={arraw} alt='' style={{ width: '16px', height: '12px' }} />
      );
    };

    return (
      <DatePicker
        selected={selectedDate}
        onChange={(date: any) => onDateChanged(date)}
        dateFormat={format}
        showMonthYearPicker={showMonthYearPicker}
        customInput={<DateCustomInput />}
        maxDate={maxDate}
        previousYearButtonLabel={renderArrow(arrowLeft)}
        nextYearButtonLabel={renderArrow(arrowRight)}
      />
    );
  },
);
