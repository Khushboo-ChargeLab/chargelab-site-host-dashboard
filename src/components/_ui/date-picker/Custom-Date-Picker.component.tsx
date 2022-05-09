import { memo, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { calendar } from '../../../lib';
import {
  Label,
  LabelType,
  RadioGroup,
  GroupDirection,
  CheckBoxData,
  DateTimePicker,
} from '../index';
import { useOnClickOutside } from '../../../hooks';
import {
  getLastMonth,
  getLastWeek,
  formatDate,
  formatDateRange,
} from '../../../utils/Date.Util';

export enum DATE_RANGE {
  LAST_WEEK = 'LAST_WEEK',
  LAST_MONTH = 'LAST_MONTH',
  CUSTOM_RANGE = 'CUSTOM_RANGE',
}

export interface InputProps {
  onChange?: (date: any) => void;
  className?: string;
  format?: string;
  dataRange?: boolean;
}

export const CustomDatePicker = memo(
  ({ onChange, className = '', format, dataRange = true }: InputProps) => {
    const [open, isOpen] = useState(false);
    const ref = useRef(null);
    const { t } = useTranslation();

    useOnClickOutside(ref, () => isOpen(false));
    const [selectedRange, setSelectedRange] = useState<any>();
    const [options, setOptions] = useState<CheckBoxData[]>([
      {
        label: t('date_picker_last_week'),
        selected: true,
        id: DATE_RANGE.LAST_WEEK,
      },
      {
        label: t('date_picker_last_month'),
        selected: false,
        id: DATE_RANGE.LAST_MONTH,
      },
      {
        label: t('date_picker_custom_range'),
        selected: false,
        id: DATE_RANGE.CUSTOM_RANGE,
      },
    ]);

    const toggleMenu = () => {
      isOpen(!open);
    };

    const customDateChanged = useCallback(
      (date: any) => {
        setSelectedRange(date);
        const newOptions = options.map((option) => {
          return {
            ...option,
            selected: option.id === DATE_RANGE.CUSTOM_RANGE,
          };
        });
        setOptions(newOptions);
        onChange && onChange(date);
      },
      [onChange],
    );

    const optionChanged = useCallback(
      (newOptions: CheckBoxData[]) => {
        setOptions(newOptions);
        const op = newOptions.find((o) => o.selected);
        switch (op?.id) {
          case DATE_RANGE.LAST_WEEK: {
            onChange && onChange(getLastWeek());
            break;
          }

          case DATE_RANGE.LAST_MONTH: {
            onChange && onChange(getLastMonth());
            break;
          }

          default:
        }

        return '';
      },
      [onChange],
    );

    const getHeaderText = () => {
      const selectedId = options.find((o) => o.selected)?.id;
      switch (selectedId) {
        case DATE_RANGE.LAST_WEEK:
          return t('date_picker_last_week');
        case DATE_RANGE.LAST_MONTH:
          return t('date_picker_last_month');
        case DATE_RANGE.CUSTOM_RANGE:
          return selectedRange?.length > 0
            ? formatDateRange(selectedRange)
            : t('date_picker_custom_range');
        default:
          console.warn('unknown range id');
          return '';
      }
    };

    return (
      <div ref={ref}>
        <div
          onClick={toggleMenu}
          className={`flex text-grey6 h-10 bg-silver rounded  items-center cursor-pointer ${className}`}
        >
          <img src={calendar} alt='' className='pl-4' />
          <Label
            text={getHeaderText()}
            type={LabelType.DROPDOWN_HEADER}
            className='ml-2.5 pr-4'
          />
        </div>

        <div
          style={{ visibility: open ? 'visible' : 'hidden' }}
          className='absolute block mt-3 w-52 list-shadow rounded p-2 bg-white'
        >
          <RadioGroup
            name='custom-day'
            direction={GroupDirection.Vertical}
            onChange={optionChanged}
            defaultItems={options}
          />
          <div className='flex p-1'>
            <DateTimePicker
              dateRange={dataRange}
              className='min-width-190'
              defaulttext='Choose a range'
              onChange={customDateChanged}
              format={format}
            />
          </div>
        </div>
      </div>
    );
  },
);
