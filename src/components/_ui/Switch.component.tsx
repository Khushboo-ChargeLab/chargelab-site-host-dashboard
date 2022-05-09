import React, { memo, useCallback, useState } from 'react';
import { Label, LabelType } from './Label.component';

interface InputProps {
  disableLabel?: string;
  enableLabel?: string;
  defaultValue?: boolean;
  onChange?: Function;
  segmented?: boolean;
  className?: string;
  options?: any[];
}

export const Switch = memo(
  ({
    disableLabel,
    enableLabel,
    defaultValue = false,
    onChange,
    segmented = false,
    className = '',
    options = [],
  }: InputProps) => {
    const [checked, setChecked] = useState(defaultValue);
    const [selected, setSelected] = useState('');

    const otherOptions = 'h-9 w-32 flex items-center mx-1 place-content-center';

    const updateChecked = () => {
      setChecked(!checked);
      onChange && onChange(!checked);
    };

    const itemSelected = useCallback(
      (option: any) => {
        setSelected(option);
        onChange && onChange(option);
      },
      [onChange],
    );

    if (segmented) {
      return (
        <div
          className={`flex items-center bg-silver h-11 cursor-pointer rounded-3xl ${className}`}
        >
          {options.map((op, index) => {
            const isSelected = selected === op || (!selected && index === 0);
            console.log('isSelected:', isSelected);
            return (
              <div
                key={op}
                onClick={() => itemSelected(op)}
                className={`${otherOptions} ${
                  isSelected && 'bg-white box-shadow-switch'
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    isSelected ? 'text-black' : 'text-grey5'
                  }`}
                >
                  {op}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div className={`flex flex-row items-center gap-2 ${className}`}>
        <div
          onClick={updateChecked}
          className={`w-12 h-6 rounded-full flex items-center  my-1  cursor-pointer ${
            !checked ? 'bg-grey justify-items-start' : 'bg-green-light4 '
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white ${
              !checked ? 'absolute ml-1' : 'ml-auto mr-1'
            }`}
          />
        </div>
        <span className='self-center'>
          <Label
            text={!checked ? disableLabel || 'Off' : enableLabel || 'On'}
            type={LabelType.BODY2}
          />
        </span>
      </div>
    );
  },
);
