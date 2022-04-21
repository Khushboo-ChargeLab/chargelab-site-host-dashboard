import { memo, useState, useEffect } from 'react';
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
  filterStr?: string;
  label?:string;
}

const CheckBoxGroup = ({
  name,
  defaultItems,
  direction = GroupDirection.Horizontal,
  singleSelection = false,
  onChange,
  filterStr = '',
  label = 'label',
}: CheckBoxGroupProps) => {
  const [items, setItems] = useState(defaultItems);
  useEffect(() => {
    setItems(defaultItems);
  }, [defaultItems]);

  const changeHandler = (selected: boolean, i: number) => {
    const newItems = items.map((item, index) => {
      if (singleSelection) {
        return { ...item, selected: index === i ? selected : false };
      }
      return {
        ...item,
        selected: index === i ? selected : item.selected,
      };
    });
    setItems(newItems);
    if (onChange) onChange(newItems);
  };

  return (
    <div className={`flex ${direction === GroupDirection.Vertical ? 'flex-col' : 'flex-row gap-4'}`}>
      {items.map((rowData:any, index) => {
        const item = rowData[label] as string;
        if (filterStr && !item.toLowerCase().includes(filterStr.toLowerCase())) {
          return null;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${item}-${index}`} className={`flex hover:bg-silver h-12 ${direction === GroupDirection.Vertical && 'pl-2 pr-12'} `}>
            <CheckBox
              index={index}
              name={name}
              // eslint-disable-next-line react/no-array-index-key
              key={`${item}-${index}`}
              label={item}
              selected={rowData.selected || false}
              singleSelection={singleSelection}
              onChange={changeHandler}
            />
          </div>
        );
      })}
    </div>
  );
};

CheckBoxGroup.defaultProps = {
  direction: GroupDirection.Horizontal,
  singleSelection: false,
};

export default memo<CheckBoxGroupProps>(CheckBoxGroup);
