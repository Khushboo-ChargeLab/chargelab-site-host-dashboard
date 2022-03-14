import { memo } from 'react';
import { formatDate } from '../../../utils/Date.Util';
import { Label, LabelType } from '../Label.component';
import { GridColumnType } from './enums/Grid-Column-Type.enum';
import { InputProps } from "./Grid.component"
import { GridColumn } from './types/Grid-Column.interface';

export const GridBody = memo((
    {columns, data, primaryKey}:InputProps
)=>{

    const formatData = (col: GridColumn, dataRow: any)=>{
        const data = dataRow[col.key];

        switch(col.type) {
            case GridColumnType.DATE:
            {
                if(data) {
                    return formatDate(new Date(data), col.format);
                }
            }
            
        }

        if(col.component)
        {
            const Component  = col.component;
            return (<Component {...dataRow} />);
        }

        return data;
    }

    return (
        <div className="tbody">
            {data?.map((dataRow:any)=>(
                <div key={dataRow[primaryKey]} className='row'>
                    {columns.map((col:GridColumn)=>(
                        <div key={col.key} className='th pt-2.5 pb-2.5 pl-3'>
                            <Label type={LabelType.BODY3} text={formatData(col,dataRow)} />
                        </div>
                    ))}
                </div>
            ))}
            <div className='row footer'>
                &nbsp;
            </div>
        </div>
    )
});