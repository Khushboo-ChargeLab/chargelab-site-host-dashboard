import React, { memo, useCallback } from 'react';
import { convertToLocaleCurrency } from '../../../utils/Currency.Util';
import { formatDate, formatDateTime } from '../../../utils/Date.Util';
import { Label, LabelType } from '../Label.component';
import { GridColumnType } from './enums/Grid-Column-Type.enum';
import { InputProps } from './Grid.component';
import { GridColumn } from './types/Grid-Column.interface';

export const GridBody = memo(({ columns, data, primaryKey, onRowClick, pageIndex, local }: InputProps) => {
  const formatData = (col: GridColumn, dataRow: any) => {
    let currentData = '';

    if (col.key.indexOf('.') !== -1) {
      currentData = dataRow;
      col.key.split('.').forEach((key:any) => {
        currentData = currentData[key];
      });
    } else if (col.key.indexOf('|') !== -1) {
      const keys = col.key.split('|');
      currentData = dataRow[keys[0]];

      if (!currentData) {
        currentData = dataRow[keys[1]];
      }
    } else {
      currentData = dataRow[col.key];
    }

        if (col.type === GridColumnType.DATE) {
            if (currentData) {
                return formatDate(new Date(currentData), col.format);
            }
        } else if (col.type === GridColumnType.DATETIME) {
          if (currentData) {
              return formatDateTime(new Date(currentData.split('[')[0]), col.format);
          }
      } else if (col.type === GridColumnType.CURRENCY) {
        if (currentData) {
            return convertToLocaleCurrency(+currentData);
          }
      }

    if (col.component) {
      const Component = col.component;
      return <Component {...dataRow} />;
    }

    return currentData;
  };

  const rowClicked = useCallback((row:any) => {
    onRowClick && onRowClick(row);
  }, [onRowClick]);

  return (
    <div className='tbody'>
      {(local ? (data || []).filter((d:any, index) => index >= ((pageIndex || 1) - 1) * 20 && index < (((pageIndex || 1) - 1) * 20) + 20) : (data || [])).map((dataRow: any) => (
        <div onClick={() => rowClicked(dataRow)} key={dataRow[primaryKey]} className={`row ${onRowClick ? 'hover:bg-silver cursor-pointer' : ''}`}>
          {columns.map((col: GridColumn) => (
            <div key={col.key} className='th pt-2 pb-2 pl-3'>
              <Label type={LabelType.BODY3} text={formatData(col, dataRow)} />
            </div>
          ))}
        </div>
      ))}
      <div className='row footer'>&nbsp;</div>
    </div>
  );
});
