import React, { memo } from 'react';
import { Label, LabelType } from '../Label.component';
import { GridColumn } from './types/Grid-Column.interface';

interface InputProps {
    columns:GridColumn[];
}
export const GridHeader = memo((
    { columns }:InputProps,
) => (
  <div className="header">
    {columns.map((col:GridColumn) => (
      <div key={col.key} className="th pt-2.5 pb-2.5 pl-3">
        <Label type={LabelType.H7} text={col.title} />
      </div>
            ))}
  </div>
    ));