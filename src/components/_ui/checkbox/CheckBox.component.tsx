/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from 'react';
import { Label, LabelType } from '..';

interface CheckBoxProps {
  name?: string;
  label?: string;
  isChecked?: boolean;
  onChange?: Function;
  isDisabled?: boolean;
  singleSelection?: boolean;
  index?: number;
}

const CheckBox = ({
  name = '',
  onChange,
  label = '',
  isChecked = false,
  isDisabled = false,
  singleSelection = false,
  index,
}: CheckBoxProps) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    if (checked !== isChecked) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    if (onChange) onChange(event.target.checked, index);
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-start">
      <input
        className={`w-4 h-4 justify-center  ${
          singleSelection ? 'form-radio' : 'rounded-sm form-checkbox'
        }`}
        type={singleSelection ? 'radio' : 'checkbox'}
        checked={checked}
        onChange={handleChange}
        disabled={isDisabled}
        name={name}
        value={label}
      />
      <Label type={LabelType.BODY3} text={label} />
    </div>
  );
};

CheckBox.defaultProps = {
  name: '',
  label: '',
  isChecked: false,
  onChange: () => null,
  isDisabled: false,
  singleSelection: false,
  index: -1,
};

export default memo<CheckBoxProps>(CheckBox);
