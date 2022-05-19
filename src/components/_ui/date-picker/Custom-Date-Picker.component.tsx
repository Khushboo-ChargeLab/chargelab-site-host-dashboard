import { memo, useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import DatePicker from 'react-datepicker';
import { calendar, calendarSelected } from '../../../lib';
import {
  Label,
  LabelType,
  RadioGroup,
  GroupDirection,
  CheckBoxData,
  DateTimePicker,
  DateRangePicker,
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
  format?: string;
  highLightBGColor?: string;
}

export const CustomDatePicker = memo(
  ({ onChange, format, highLightBGColor = 'bg-grey6' }: InputProps) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const ref = useRef(null);
    const { t } = useTranslation();

    useOnClickOutside(ref, () => {
      setIsDropDownOpen(false);
      setIsPickerOpen(false);
    });

    const [selectedRange, setSelectedRange] = useState<(Date | null)[]>([
      null,
      null,
    ]);
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
      setIsDropDownOpen(!isDropDownOpen);
      setIsPickerOpen(false);
    };

    const openPicker = () => {
      setIsDropDownOpen(false);
      setIsPickerOpen(true);
    };

    const closePicker = () => {
      setIsDropDownOpen(false);
      setIsPickerOpen(false);
    };

    useEffect(() => {
      if (selectedRange?.length === 2 && selectedRange[0] && selectedRange[1]) {
        onChange && onChange(selectedRange);
        closePicker();
      }
    }, selectedRange);

    const customDateChanged = (date: Date[]) => {
      setSelectedRange(date);
    };

    const optionChanged = (newOptions: CheckBoxData[]) => {
      setOptions(newOptions);
      const op = newOptions.find((o) => o.selected);
      switch (op?.id) {
        case DATE_RANGE.LAST_WEEK: {
          setSelectedRange(getLastWeek());
          break;
        }

        case DATE_RANGE.LAST_MONTH: {
          setSelectedRange(getLastMonth());
          break;
        }
        case DATE_RANGE.CUSTOM_RANGE: {
          setSelectedRange([null, null]);
          openPicker();
          break;
        }

        default:
      }

      return '';
    };

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

    const onPickerClicked = () => {
      const newOptions = options.map((option) => {
        return {
          ...option,
          selected: option.id === DATE_RANGE.CUSTOM_RANGE,
        };
      });
      setOptions(newOptions);
      openPicker();
    };

    const renderCustomRanngeButton = () => {
      const selectedOptionId = options.find((o) => o.selected)?.id;
      if (selectedOptionId !== DATE_RANGE.CUSTOM_RANGE) {
        return null;
      }
      return (
        <div className='flex p-1'>
          <div className='react-datepicker-wrapper'>
            <div className='react-datepicker__input-container'>
              <button
                className='date-range-selector bg-silver min-width-190'
                onClick={onPickerClicked}
              >
                <div className='block'>
                  <div className='text-left ml-2 text-[12px] font-normal text-black'>
                    {formatDateRange(selectedRange)}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    };
    const renderDropdown = () => {
      return (
        <div
          className='absolute block mt-3 w-52 list-shadow rounded p-2 bg-white z-50'
          style={{ visibility: isDropDownOpen ? 'visible' : 'hidden' }}
        >
          <RadioGroup
            name='custom-day'
            direction={GroupDirection.Vertical}
            onChange={optionChanged}
            defaultItems={options}
          />
          {renderCustomRanngeButton()}
        </div>
      );
    };

    const renderDateRangePicker = () => {
      return (
        <div
          className='absolute py-2 -ml-4 z-50'
          style={{ visibility: isPickerOpen ? 'visible' : 'hidden' }}
        >
          <DateRangePicker
            defaultRange={selectedRange}
            onChange={customDateChanged}
            format={format}
            monthsShown={2}
            inline
          />
        </div>
      );
    };

    const renderHeaderInput = () => {
      const selectedOptionId = options.find((o) => o.selected)?.id;
      const isHighLight =
        selectedOptionId === DATE_RANGE.CUSTOM_RANGE ||
        selectedOptionId === DATE_RANGE.LAST_MONTH;
      return (
        <div
          onClick={toggleMenu}
          className={`flex text-grey6 h-10 rounded  items-center cursor-pointer ${
            isHighLight ? highLightBGColor : 'bg-silver'
          }`}
        >
          <img
            src={isHighLight ? calendarSelected : calendar}
            alt=''
            className='pl-4'
          />
          <Label
            text={getHeaderText()}
            type={
              isHighLight
                ? LabelType.DROPDOWN_HEADER_SELECTED
                : LabelType.DROPDOWN_HEADER
            }
            className='ml-2.5 pr-4'
          />
        </div>
      );
    };

    return (
      <div ref={ref}>
        {renderHeaderInput()}
        {renderDropdown()}
        {renderDateRangePicker()}
      </div>
    );
  },
);
