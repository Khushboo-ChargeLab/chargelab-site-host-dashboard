import { memo, useState, useRef, useCallback } from 'react';
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
      console.log('custom useOnClickOutside');
      setIsDropDownOpen(false);
      setIsPickerOpen(false);
    });
    const [selectedRange, setSelectedRange] = useState(getLastWeek());
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
      console.log('custom toggleMenu');
      setIsDropDownOpen(!isDropDownOpen);
      setIsPickerOpen(false);
    };

    const openPicker = () => {
      console.log('custom openPicker');
      setIsDropDownOpen(false);
      setIsPickerOpen(true);
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
          case DATE_RANGE.CUSTOM_RANGE: {
            onChange && onChange(selectedRange);
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

    const renderDropdown = () => {
      const selectedOptionId = options.find((o) => o.selected)?.id;
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
          <div className='flex p-1'>
            <div className='react-datepicker-wrapper'>
              <div className='react-datepicker__input-container'>
                <button
                  className='date-range-selector bg-silver min-width-190'
                  onClick={onPickerClicked}
                >
                  <div className='block'>
                    <div
                      className={`text-left ml-2 text-[12px] font-normal ${
                        selectedOptionId === DATE_RANGE.CUSTOM_RANGE
                          ? 'text-black'
                          : 'text-grey4'
                      }`}
                    >
                      {(selectedOptionId === DATE_RANGE.CUSTOM_RANGE &&
                        formatDateRange(selectedRange)) ||
                        'Choose a range'}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const renderDateRangePicker = () => {
      const selectedOptionId = options.find((o) => o.selected)?.id;
      console.log('selectedOptionId:', selectedOptionId);
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
      const isHighLight = selectedOptionId === DATE_RANGE.CUSTOM_RANGE;
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
    console.log('custom render');
    console.log('custom isPickerOpen:', isPickerOpen);
    console.log('custom isDropDownOpen:', isDropDownOpen);
    return (
      <div ref={ref}>
        {renderHeaderInput()}
        {renderDropdown()}
        {renderDateRangePicker()}
      </div>
    );
  },
);
