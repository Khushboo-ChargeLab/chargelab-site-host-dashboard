import React, { memo, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import {
  Label,
  LabelType,
  CheckBoxGroup,
  CheckBoxData,
  GroupDirection,
  FormInput,
  InputIconType,
  CheckBoxTree,
  Pill,
} from '..';
import { chevdown, chevdownSelected } from '../../../lib';
import { useOnClickOutside } from '../../../hooks';

const SEARCH_BAR_DISPLAY_NUMBER = 10;

export enum DropdownType {
  SELECT,
  CHECKBOX,
  CHECKBOX_TREE,
}

interface DropdownProps {
  title?: string;
  items?: Array<any>;
  onItemClick?: Function;
  type?: DropdownType;
  headerWidth?: any;
  label?: string;
  headerClassName?: string;
  headerHighLightClassName?: string;
  inputWidth?: string;
}

export const Dropdown = memo(
  ({
    items = [],
    onItemClick,
    title = '',
    type = DropdownType.SELECT,
    headerWidth = 143,
    label = 'label',
    headerClassName = 'bg-silver border-grey-light2 rounded',
    headerHighLightClassName = 'bg-grey6 border-grey-light2 rounded',
    inputWidth = '',
  }: DropdownProps) => {
    const [_title, setTitle] = useState(() => {
      let defaultTitle = title;
      if (type === DropdownType.SELECT) {
        items.forEach((item) => {
          if (item.selected) {
            defaultTitle = item[label];
          }
        });
      }
      return defaultTitle;
    });
    const { t } = useTranslation();
    const [_items, setItems] = useState(_.cloneDeep(items));
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setOpen(false));
    const [searchStr, setSearchStr] = useState('');

    useEffect(() => {
      setItems(items);
    }, [items]);

    const handleHeaderClick = () => {
      setOpen(!isOpen);
    };

    const handleItemClick = (item: any, index: number) => {
      setOpen(!isOpen);
      const newItems: Array<any> = _items.map((_item, _index) => ({
        ..._item,
        selected: _index === index,
      }));
      setItems(newItems);
      setTitle(item[label] === 'All' ? title : item[label]);

      if (type === DropdownType.SELECT) {
        onItemClick && onItemClick(item, index);
      } else {
        onItemClick && onItemClick(newItems, item, index);
      }
    };

    const handleClearClick = () => {
      let newItems;
      if (type === DropdownType.CHECKBOX_TREE) {
        newItems = _items.map((_item, _index) => ({
          ..._item,
          selected: false,
          children: _item.children?.map((child: any) => ({
            ...child,
            selected: false,
          })),
        }));
      } else {
        newItems = _items.map((_item, _index) => ({
          ..._item,
          selected: false,
        }));
      }

      setItems(newItems);
      setTitle(title);
      onItemClick && onItemClick(newItems);
    };

    const handleCheckBoxSelect = (newItems: CheckBoxData[]) => {
      setItems(newItems);
      onItemClick && onItemClick(newItems);
    };

    const handleSearch = (event: any) => {
      setSearchStr(event.target.value);
    };

    const handleParentPillClick = (item: any, pIndex: number) => {
      const newItems = _items.map((_item, index) => {
        if (index === pIndex) {
          const newChildren = _item.children?.map((child: any) => ({
            ...child,
            selected: false,
          }));
          return { ..._item, selected: false, children: newChildren };
        }
        return _item;
      });
      setItems(newItems);
      onItemClick && onItemClick(newItems);
    };

    const handleChildPillClick = (pIndex: number, cIndex: number) => {
      const newItems = _items.map((_item, index) => {
        if (index === pIndex) {
          let isAllChildrenChecked = true;
          const newChildren = _item.children?.map(
            (child: any, childIndex: number) => {
              const newSelected =
                childIndex === cIndex ? false : child.selected;
              if (!newSelected) isAllChildrenChecked = false;
              return {
                ...child,
                selected: newSelected,
              };
            },
          );
          return {
            ..._item,
            selected: isAllChildrenChecked,
            children: newChildren,
          };
        }
        return _item;
      });
      setItems(newItems);
      onItemClick && onItemClick(newItems);
    };

    const getPills = () => {
      const pills: any = [];
      _items.forEach((item, pIndex) => {
        if (item.selected) {
          pills.push(
            <Pill
              // eslint-disable-next-line react/no-array-index-key
              key={`${item[label]}-${pIndex}`}
              onClick={() => handleParentPillClick(item, pIndex)}
              label={item[label]}
              isButton
              width='auto'
              labelType={LabelType.PILL_DROPDOWN}
            />,
          );
        } else {
          item.children?.forEach((child: any, cIndex: number) => {
            if (child.selected) {
              pills.push(
                <Pill
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${item[label]}-${cIndex}`}
                  onClick={() => handleChildPillClick(pIndex, cIndex)}
                  label={child.label}
                  isButton
                  width='auto'
                  labelType={LabelType.PILL_DROPDOWN}
                />,
              );
            }
          });
        }
      });
      return pills;
    };
    const renderCheckBoxHeader = () => {
      const pills = getPills();
      if (pills.length > 0) {
        return (
          <div
            className='bg-silver flex place-content-between px-2 py-2.5 overflow-y-auto max-h-32 rounded-lg'
            style={{ width: headerWidth }}
          >
            <div className='inline-flex flex-wrap gap-1'>{pills}</div>
            <button
              className='justify-self-end w-10 h-10 flex-none'
              type='button'
              onClick={handleHeaderClick}
            >
              <img className='pl-4' src={chevdown} alt='' />
            </button>
          </div>
        );
      }
      return (
        <div>
          <button
            className='bg-silver rounded px-4 py-2.5 text-center inline-flex items-center'
            type='button'
            onClick={handleHeaderClick}
            style={{ width: headerWidth }}
          >
            <Label text={_title} type={LabelType.DROPDOWN_HEADER} />
          </button>
        </div>
      );
    };

    const isAnyItemSelected = () => {
      return _items.some((_item) => _item.selected);
    };

    const renderHeader = () => {
      if (type === DropdownType.CHECKBOX_TREE) {
        return renderCheckBoxHeader();
      }

      return (
        <button
          className={`
            ${isAnyItemSelected() ? headerHighLightClassName : headerClassName}
            `}
          type='button'
          onClick={handleHeaderClick}
          style={{ width: headerWidth }}
        >
          <div className='h-10 place-content-between pl-4 pr-2 py-2.5 text-center inline-flex items-center'>
            <Label
              text={_title}
              type={
                isAnyItemSelected()
                  ? LabelType.DROPDOWN_HEADER_SELECTED
                  : LabelType.DROPDOWN_HEADER
              }
            />
            <img
              className='pl-4'
              src={isAnyItemSelected() ? chevdownSelected : chevdown}
              alt=''
            />
          </div>
        </button>
      );
    };

    const renderSearchHeader = () => (
      <FormInput
        placeholder={t('search')}
        iconType={InputIconType.SEARCH}
        onChange={handleSearch}
        props={{ style: { 'width': inputWidth } }}
      />
    );

    const renderContentFooter = () => (
      <button
        type='button'
        className='hover:bg-silver pl-2 pr-12 h-12 text-left'
        onClick={handleClearClick}
      >
        <Label type={LabelType.DROPDOWN_ITEM_SELECTED} text={t('clear')} />
      </button>
    );

    const renderItems = () => {
      switch (type) {
        case DropdownType.SELECT:
          return _items.map((item, index) => {
            const key = `${item[label]}-${index}`;
            return (
              <button
                key={key}
                type='button'
                className={`hover:bg-silver pl-2 pr-12 min-h-[40px] text-left ${
                  item.selected ? 'bg-silver rounded' : ''
                }`}
                onClick={() => handleItemClick(item, index)}
              >
                <Label
                  type={
                    item.selected
                      ? LabelType.DROPDOWN_ITEM_SELECTED
                      : LabelType.BODY3
                  }
                  text={item[label]}
                />
              </button>
            );
          });
        case DropdownType.CHECKBOX:
          return (
            <CheckBoxGroup
              name={title}
              defaultItems={items}
              onChange={handleCheckBoxSelect}
              direction={GroupDirection.Vertical}
              filterStr={searchStr}
              label={label}
            />
          );
        case DropdownType.CHECKBOX_TREE:
          return (
            <CheckBoxTree
              defaultNodes={_items}
              onChange={handleCheckBoxSelect}
              filterStr={searchStr}
            />
          );
        default:
          console.warn('Dropdown renderItems unknown tyep:', type);
          return null;
      }
    };

    const getIsShowSearchHeader = () => {
      let count = 0;
      switch (type) {
        case DropdownType.SELECT:
          return false;
        case DropdownType.CHECKBOX:
          return items.length > SEARCH_BAR_DISPLAY_NUMBER;
        case DropdownType.CHECKBOX_TREE:
          items.forEach((item) => {
            count += item.children?.length || 0;
          });
          return count > SEARCH_BAR_DISPLAY_NUMBER;
        default:
          return false;
      }
    };

    const renderContent = () => {
      if (!isOpen) {
        return null;
      }
      const showSearchHeader = getIsShowSearchHeader();
      const showContentFooter = type !== DropdownType.SELECT;
      return (
        <div className='absolute flex flex-col bg-white z-50 list-none rounded list-shadow my-2 p-2 max-h-[30rem] overflow-auto overflow-x-hidden'>
          {showSearchHeader && renderSearchHeader()}
          {renderItems()}
          {showContentFooter && renderContentFooter()}
        </div>
      );
    };

    return (
      <div ref={ref}>
        {renderHeader()}
        {renderContent()}
      </div>
    );
  },
);
