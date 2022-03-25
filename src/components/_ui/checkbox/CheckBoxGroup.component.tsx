import { memo, useState } from 'react';
import CheckBox from './CheckBox.component';
import { CheckBoxData } from './types/CheckBox-Column.interface';

export enum GroupDirection {
  Horizontal,
  Vertical,
}

interface CheckBoxGroupProps {
  name: string;
  direction?: GroupDirection;
  defaultItems: CheckBoxData[];
  singleSelection?: boolean;
  onChange: Function;
}

const CheckBoxGroup = ({
  name,
  defaultItems,
  direction = GroupDirection.Horizontal,
  singleSelection = false,
  onChange,
}: CheckBoxGroupProps) => {
  const [items, setItems] = useState(defaultItems);

  const changeHandler = (isChecked: boolean, i: number) => {
    const newItems = items.map((item, index) => {
      if (singleSelection) {
        return { ...item, isChecked: index === i ? isChecked : false };
      }
      return {
        ...item,
        isChecked: index === i ? isChecked : item.isChecked,
      };
    });

    setItems(newItems);
    if (onChange) onChange(items);
  };

  const classes = `flex  ${direction ? 'flex-col gap-2' : 'flex-row gap-4'}`;
  return (
    <div className={classes}>
      {items.map((item, index) => (
        <CheckBox
          index={index}
          name={name}
          // eslint-disable-next-line react/no-array-index-key
          key={`${item.label}-${index}`}
          label={item.label}
          isChecked={item.isChecked || false}
          singleSelection={singleSelection}
          onChange={changeHandler}
        />
      ))}
    </div>
  );
};

CheckBoxGroup.defaultProps = {
  direction: GroupDirection.Horizontal,
  singleSelection: false,
};

export default memo<CheckBoxGroupProps>(CheckBoxGroup);
