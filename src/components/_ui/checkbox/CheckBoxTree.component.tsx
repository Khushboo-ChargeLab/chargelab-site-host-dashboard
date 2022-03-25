/* eslint-disable react/no-array-index-key */
import { memo, useState } from 'react';
import CheckBox from './CheckBox.component';
import { CheckBoxData } from './types/CheckBox-Column.interface';

interface CheckBoxTreeProps {
  onChange?: Function;
  defaultNodes: CheckBoxData[];
}

export const CheckBoxTree = ({ defaultNodes, onChange }: CheckBoxTreeProps) => {
  const [nodes, setNodes] = useState(defaultNodes);

  const handleParentChange = (isChecked: boolean, pIndex: number) => {
    const newNodes = nodes.map((node, index) => {
      if (index === pIndex) {
        const newChildren = node.children?.map((child) => ({ ...child, isChecked }));
        return { ...node, isChecked, children: newChildren };
      }
      return node;
    });
    setNodes(newNodes);
    if (onChange) onChange(newNodes);
  };

  const handleChildrenChange = (
    isChecked: boolean,
    cIndex: number,
    pIndex: number,
  ) => {
    const newNodes = nodes.map((node, index) => {
      if (index === pIndex) {
        let isAllChildrenChecked = true;
        const newChildren = node.children?.map((child, childIndex) => {
          const newIsChecked = childIndex === cIndex ? isChecked : child.isChecked;
          if (!newIsChecked) isAllChildrenChecked = false;
          return {
            ...child,
            isChecked: newIsChecked,
          };
        });
        return {
          ...node,
          isChecked: isAllChildrenChecked,
          children: newChildren,
        };
      }
      return node;
    });
    console.log('handleChildrenChange newNodes:', newNodes);
    setNodes(newNodes);
    if (onChange) onChange(newNodes);
  };

  return (
    <div>
      {nodes.map((node, pIndex) => (
        <div key={`${node.label}-${pIndex}`} className="p-2">
          <CheckBox
            index={pIndex}
            label={node.label}
            isChecked={node.isChecked}
            onChange={handleParentChange}
          />
          {node.children?.map((child, cIndex) => (
            <div key={`${child.label}-${cIndex}`} className="p-1 ml-3">
              <CheckBox
                name={node.label}
                index={cIndex}
                label={child.label}
                isChecked={child.isChecked}
                onChange={(isChecked: boolean, childIndex: number) => handleChildrenChange(isChecked, childIndex, pIndex)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

CheckBoxTree.defaultProps = {
  onChange: () => null,
};

export default memo<CheckBoxTreeProps>(CheckBoxTree);
