import { memo } from 'react';
import { CheckBoxGroup, GroupDirection } from './CheckBoxGroup.component';
import { CheckBoxData } from './types/CheckBox-Column.interface';

interface RadioGroupProps {
  name: string;
  direction?: GroupDirection;
  defaultItems: CheckBoxData[];
  onChange: Function;
}

export const RadioGroup = ({
  name,
  direction = GroupDirection.Horizontal,
  defaultItems,
  onChange,
}: RadioGroupProps) => (
  <CheckBoxGroup
    name={name}
    defaultItems={defaultItems}
    direction={direction}
    singleSelection
    onChange={onChange}
  />
);

RadioGroup.defaultProps = {
  direction: GroupDirection.Horizontal,
};

export default memo<RadioGroupProps>(RadioGroup);
