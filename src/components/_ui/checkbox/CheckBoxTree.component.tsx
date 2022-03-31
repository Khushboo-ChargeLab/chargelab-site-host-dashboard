/* eslint-disable react/no-array-index-key */
import React, { memo, useState, useEffect } from 'react';
import CheckBox from './CheckBox.component';
import { CheckBoxData } from './types/CheckBox-Column.interface';

interface CheckBoxTreeProps {
  onChange?: Function;
  defaultNodes: CheckBoxData[];
  filterStr?: string;
}

const CheckBoxTree = ({
  defaultNodes,
  onChange,
  filterStr = '',
}: CheckBoxTreeProps) => {
  const [nodes, setNodes] = useState(defaultNodes);
  useEffect(() => {
    setNodes(defaultNodes);
  }, [defaultNodes]);

  const handleParentChange = (selected: boolean, pIndex: number) => {
    const newNodes = nodes.map((node, index) => {
      if (index === pIndex) {
        const newChildren = node.children?.map((child) => ({
          ...child,
          selected,
        }));
        return { ...node, selected, children: newChildren };
      }
      return node;
    });
    setNodes(newNodes);
    if (onChange) onChange(newNodes);
  };

  const handleChildrenChange = (
    selected: boolean,
    cIndex: number,
    pIndex: number,
  ) => {
    const newNodes = nodes.map((node, index) => {
      if (index === pIndex) {
        let isAllChildrenChecked = true;
        const newChildren = node.children?.map((child, childIndex) => {
          const newSelected = childIndex === cIndex ? selected : child.selected;
          if (!newSelected) isAllChildrenChecked = false;
          return {
            ...child,
            selected: newSelected,
          };
        });
        return {
          ...node,
          selected: isAllChildrenChecked,
          children: newChildren,
        };
      }
      return node;
    });
    setNodes(newNodes);
    if (onChange) onChange(newNodes);
  };

  return (
    <div className='flex flex-col'>
      {nodes.map((node, pIndex) => {
        const shouldDisplayParent =
          node.label.toLowerCase().includes(filterStr.toLowerCase()) ||
          node.children?.some((child) =>
            child.label.toLowerCase().includes(filterStr.toLowerCase()),
          );
        if (!shouldDisplayParent) {
          return null;
        }
        return (
          <div key={`${node.label}-${pIndex}`}>
            <div className='flex hover:bg-silver h-12 pl-2 pr-12'>
              <CheckBox
                index={pIndex}
                label={node.label}
                selected={node.selected}
                onChange={handleParentChange}
              />
            </div>

            {node.children?.map((child, cIndex) => {
              const shouldDisplayChild = child.label
                .toLowerCase()
                .includes(filterStr.toLowerCase());
              if (!shouldDisplayChild) return null;
              return (
                <div
                  key={`${child.label}-${cIndex}`}
                  className='flex hover:bg-silver h-12 pl-2 pr-12 ml-3'
                >
                  <CheckBox
                    name={node.label}
                    index={cIndex}
                    label={child.label}
                    selected={child.selected}
                    onChange={(selected: boolean, childIndex: number) =>
                      handleChildrenChange(selected, childIndex, pIndex)
                    }
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

CheckBoxTree.defaultProps = {
  onChange: () => null,
};

export default memo<CheckBoxTreeProps>(CheckBoxTree);
