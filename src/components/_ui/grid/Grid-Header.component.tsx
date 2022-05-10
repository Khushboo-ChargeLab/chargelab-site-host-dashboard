import React, { memo } from 'react';
import { Label, LabelType } from '../Label.component';
import { GridColumn } from './types/Grid-Column.interface';

interface InputProps {
  columns: GridColumn[];
}
export const GridHeader = memo(({ columns }: InputProps) => (
  <thead className='border-t border-b border-grey2'>
    <tr>
      {columns.map((col: GridColumn) => (
        <div key={col.key} className='th pl-2 py-2'>
          <Label type={LabelType.H7} text={col.title} />
        </div>
      ))}
    </tr>
  </thead>
));
