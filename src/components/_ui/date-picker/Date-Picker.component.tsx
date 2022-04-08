import React, {
 forwardRef, memo, useCallback, useState,
} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { chevdown, chevnext, chevpre } from '../../../lib';
import {
 formatDate, addMonths, differenceInDays, addDays,
} from '../../../utils/Date.Util';
import './Date-Picker.component.scss';

export interface InputProps {
    defaultDate?:Date;
    format?:string;
    onChange?:(date:any)=>void;
    showMonthYearPicker?:boolean;
    dateRange?:boolean;
    white?:boolean;
    dateRangeMove?:boolean;
    className?:string;
    defaulttext?:string;
}

export const DateTimePicker = memo(
    ({
        defaultDate,
        onChange,
        showMonthYearPicker = false,
        format = 'MMM yyyy',
        dateRange = false,
        white = false,
        dateRangeMove = false,
        className = '',
        defaulttext = 'Choose a range',
    }: InputProps) => {
      const [startDate, setStartDate] = useState(defaultDate);
      const [dateRangeData, setDateRange] = useState([defaultDate, addMonths(defaultDate || 0, 1)]);
      const [startDateRange, endDateRange] = dateRangeData;

      const nextMonth = useCallback(() => {
        setDateRange([endDateRange, addDays(endDateRange || 0, differenceInDays(endDateRange || 0, startDateRange || 0))]);
      }, [endDateRange, startDateRange]);

      const preMonth = useCallback(() => {
        setDateRange([addDays(startDateRange || 0, -differenceInDays(endDateRange || 0, startDateRange || 0)), startDateRange]);
      }, [startDateRange, endDateRange]);

      const hasStartAndEndDate = (dates:any) => dates.length === 2;
      const DateRangeCustomInput = forwardRef(({ value, onClick }:any, ref:any) => {
        const dates = value.split('-');
        let result = defaulttext;

        if (hasStartAndEndDate(dates)) {
          result = `${formatDate(new Date(dates[0]), format)} - ${formatDate(new Date(dates[1]), format)}`;
        }

        return (
          <button className={`date-range-selector ${white ? 'bg-white' : 'bg-silver'} ${className}`}>
            <div className="block">

              {dateRangeMove && (
              <div className="inline-block align-middle pl-4 pr-3" onClick={preMonth}>
                <img src={chevpre} alt="" />
              </div>
              )}

              <div className={`inline-block align-middle ${defaulttext && !defaultDate ? 'text-grey4 text-xs' : 'text-grey6 text-sm'}`} onClick={onClick} ref={ref}>
                {result}
              </div>

              {dateRangeMove && (
                <div className="inline-block align-middle pl-3 pr-4" onClick={nextMonth}>
                  <img src={chevnext} alt="" />
                </div>
               )}
            </div>
          </button>
);
      });

      const DateCustomInput = forwardRef(({ value, onClick }:any, ref:any) => (
        <button className={`react-datepicker__input-container-button ${white ? 'bg-white' : 'bg-silver'}`} onClick={onClick} ref={ref}>
          <div className="block">
            <div className="inline-block text-grey6">
              {formatDate(new Date(value), format)}
            </div>
            <div className="inline-block align-middle pl-4 pr-2"><img src={chevdown} alt="" /></div>
          </div>
        </button>
));

        const validDateRange = (update:any) => update && update.length === 2 && update[0] && update[1];
      const updateDateRangeData = useCallback((update:any) => {
        setDateRange(update);

        if (validDateRange(update)) {
          onChange && onChange(update);
        }
      }, [setDateRange, onChange]);

      const dateChanged = useCallback((date:any) => {
        setStartDate(date);
        onChange && onChange(date);
      }, [onChange]);

      if (dateRange) {
        return (
          <DatePicker
            selectsRange
            startDate={startDateRange}
            endDate={endDateRange}
            onChange={(update:any) => updateDateRangeData(update)}
            customInput={<DateRangeCustomInput />}
          />
);
      }
    return (
      <DatePicker
        selected={startDate}
        onChange={(date:any) => dateChanged(date)}
        dateFormat={format}
        showMonthYearPicker={showMonthYearPicker}
        selectsRange={dateRange}
        customInput={<DateCustomInput />}
      />
);
  },
);
