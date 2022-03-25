import React, { memo } from 'react';
import CheckBox from './CheckBox.component';

interface RadioProps {
  name?: string;
  label?: string;
  isChecked?: boolean;
  onChange?: Function;
  isDisabled?: boolean;
}

const Radio = ({
  name,
  label = '',
  isChecked = false,
  onChange,
  isDisabled = false,
}: RadioProps) => (
  <CheckBox
    name={name}
    label={label}
    isChecked={isChecked}
    onChange={onChange}
    isDisabled={isDisabled}
    singleSelection
  />
);

Radio.defaultProps = {
  name: '',
  label: '',
  isChecked: false,
  onChange: () => null,
  isDisabled: false,
};

export default memo<RadioProps>(Radio);
