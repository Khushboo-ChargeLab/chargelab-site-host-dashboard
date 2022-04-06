import React, { memo } from 'react';
import CheckBox from './CheckBox.component';

interface RadioProps {
  name?: string;
  label?: string;
  selected?: boolean;
  onChange?: Function;
  isDisabled?: boolean;
}

const Radio = ({
  name,
  label = '',
  selected = false,
  onChange,
  isDisabled = false,
}: RadioProps) => (
  <CheckBox
    name={name}
    label={label}
    selected={selected}
    onChange={onChange}
    isDisabled={isDisabled}
    singleSelection
  />
);

Radio.defaultProps = {
  name: '',
  label: '',
  selected: false,
  onChange: () => null,
  isDisabled: false,
};

export default memo<RadioProps>(Radio);
