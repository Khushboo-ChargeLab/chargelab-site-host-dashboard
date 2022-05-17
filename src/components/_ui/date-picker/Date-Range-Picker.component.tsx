import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
  defaultRange?: (Date | null)[];
  format?: string;
  onChange?: (date: any) => void;
  inputBG?: string;
  defaulttext?: string;
  inline?: boolean;
  monthsShown?: number;
}

export const DateRangePicker = memo(
  ({
    defaultRange = [subWeeks(new Date(), 1), new Date()],
    onChange,
    format = 'MMM yyyy',
    inputBG = 'bg-silver',
    defaulttext = 'Choose a range',
    inline = false,
    monthsShown = 1,
  }: InputProps) => {
    const [dateRange, setDateRange] = useState(defaultRange);

    const hasStartAndEndDate = (dates: any) => dates.length === 2;
    const DateRangeCustomInput = forwardRef(
      ({ value, onClick }: any, ref: any) => {
        const dates = value.split('-');
        let result = defaulttext;

        if (hasStartAndEndDate(dates)) {
          result = `${formatDate(new Date(dates[0]), format)} - ${formatDate(
            new Date(dates[1]),
            format,
          )}`;
        }

        return (
          <button className={`date-range-selector ${inputBG}`}>
            <div className='block'>
              <div
                className={`inline-block align-middle ${
                  defaulttext && !defaultRange
                    ? 'text-grey4 text-xs'
                    : 'text-grey6 text-sm'
                }`}
                onClick={onClick}
                ref={ref}
              >
                {result}
              </div>
            </div>
          </button>
        );
      },
    );

    const onDateRangeChange = useCallback(
      (newDateRange: any) => {
        setDateRange(newDateRange);
        onChange && onChange(newDateRange);
      },
      [setDateRange, onChange],
    );

    const renderArrow = (arraw: any) => {
      return (
        <img src={arraw} alt='' style={{ width: '16px', height: '12px' }} />
      );
    };

    return (
      <DatePicker
        selectsRange
        onChange={(newDateRange: any) => onDateRangeChange(newDateRange)}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        customInput={<DateRangeCustomInput />}
        useWeekdaysShort
        previousMonthButtonLabel={renderArrow(arrowLeft)}
        nextMonthButtonLabel={renderArrow(arrowRight)}
        inline={inline}
        monthsShown={monthsShown}
      />
    );
  },
);
