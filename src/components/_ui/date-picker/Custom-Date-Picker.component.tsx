import { memo, useState, useRef, useCallback } from 'react';
import { calendar } from '../../../lib';
import { Label, LabelType, RadioGroup, GroupDirection, CheckBoxData,
  DateTimePicker } from '../index';
import { useOnClickOutside } from '../../../hooks';
import { getLastMonth, getLastWeek } from '../../../utils/Date.Util';

export interface InputProps {
    onChange?:(date:any)=>void;
    className?:string;
    format?:string;
}

export const CustomDatePicker = memo(
    ({
        onChange,
        className = '',
        format,
    }: InputProps) => {
      const [open, isOpen] = useState(false);
      const ref = useRef(null);

      useOnClickOutside(ref, () => isOpen(false));

      const [options, setOptions] = useState<CheckBoxData[]>([
        { label: 'Last week', selected: true, id: 'LASTWEEK' },
        { label: 'Last month', selected: false, id: 'LASTMONTH' },
        { label: 'Custom range', selected: false, id: '' },
      ]);

    const toggleMenu = () => {
      isOpen(!open);
    };

    const customDateChanged = useCallback((date:any) => {
      setOptions([
        { label: 'Last week', selected: false, id: 'LASTWEEK' },
        { label: 'Last month', selected: false, id: 'LASTMONTH' },
        { label: 'Custom range', selected: true, id: '' },
      ]);
      onChange && onChange(date);
    }, [onChange]);

    const optionChanged = useCallback((option:CheckBoxData[]) => {
     const op = option.find((o) => o.selected);
     switch (op?.id) {
       case 'LASTWEEK': {
        onChange && onChange(getLastWeek());
        break;
       }

       case 'LASTMONTH': {
         onChange && onChange(getLastMonth());
         break;
       }

       default:
     }

     return '';
    }, [onChange]);

    return (
      <div ref={ref}>
        <div onClick={toggleMenu} className={`flex text-grey6 h-10 bg-silver rounded  items-center cursor-pointer ${className}`}>
          <img src={calendar} alt='' className='pl-4' />
          <Label text={options.find((o) => o.selected)?.label || ''} type={LabelType.DROPDOWN_HEADER} className='ml-2.5 pr-4' />
        </div>

        <div style={{ visibility: (open ? 'visible' : 'hidden') }} className='absolute block mt-3 w-52 list-shadow rounded p-2 bg-white'>
          <RadioGroup
            name="custom-day"
            direction={GroupDirection.Vertical}
            onChange={optionChanged}
            defaultItems={options}
          />
          <div className='flex p-1'>
            <DateTimePicker
              dateRange
              className="min-width-190"
              defaulttext='Choose a range'
              defaultDate={new Date()}
              onChange={customDateChanged}
              format={format}
            />
          </div>
        </div>
      </div>
    );
    },
    );