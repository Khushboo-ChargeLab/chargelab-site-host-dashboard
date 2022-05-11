import React, { forwardRef, memo, useCallback, useState } from 'react';
import { subMonths, subYears, addMonths, getYear, getMonth } from 'date-fns';
import { chevdown, chevnext, chevpre } from '../../../lib';
import { formatDate } from '../../../utils/Date.Util';

export interface DateSelectorProps {
  endDate?: Date;
  format?: string;
  onChange?: Function;
  durationMonth?: number;
}

export const DateSelector = memo(
  ({
    endDate = new Date(),
    format = 'LLL yyyy',
    onChange,
    durationMonth = 12,
  }: DateSelectorProps) => {
    const [_endDate, setEndDate] = useState(endDate);
    const today = new Date();
    const getStartDate = (date: Date) => {
      return subMonths(date, durationMonth - 1);
    };
    const getText = () => {
      return `${formatDate(getStartDate(_endDate), format)} - ${formatDate(
        _endDate,
        format,
      )}`;
    };

    const preMonth = () => {
      const newEndDate = subMonths(_endDate, 1);
      onChange && onChange([getStartDate(newEndDate), newEndDate]);
      setEndDate(newEndDate);
    };
    const nextMonth = () => {
      const newEndDate = addMonths(_endDate, 1);
      onChange && onChange([getStartDate(newEndDate), newEndDate]);
      setEndDate(newEndDate);
    };

    const hasNextMonthDate = () => {
      if (getYear(_endDate) < getYear(today)) {
        return true;
      }
      if (getMonth(_endDate) < getMonth(today)) {
        return true;
      }

      return false;
    };

    return (
      <div className='flex items-center'>
        <button onClick={preMonth}>
          <img src={chevpre} alt='' />
        </button>
        <div className='text-grey6 text-sm font-semibold w-44 flex place-content-center'>
          {getText()}
        </div>
        {hasNextMonthDate() && (
          <button onClick={nextMonth}>
            <img src={chevnext} alt='' />
          </button>
        )}
      </div>
    );
  },
);
