import React, { memo } from 'react';
import { Label, LabelType } from '..';
import { formatDate } from '../../../utils/Date.Util';
import { TimelineData } from './types/Timeline.interface';

interface InputProps {
  data: TimelineData[];
  renderTitle?: Function;
  renderContent?: Function;
}

const renderItem = (
  data: TimelineData[],
  renderTitle?: Function,
  renderContent?: Function,
) =>
  data.map((row: TimelineData) => (
    <div
      key={`${row.title}-${row.date.getTime()}`}
      className='flex items-center relative '
    >
      <div className='border-r-2 border-black absolute h-full left-1 top-2 mb-10' />
      <div className='w-5 h-5 rounded-full bg-white top-0.5 -left-1 absolute' />
      <div className='w-2.5 h-2.5 rounded-full bg-black top-2 absolute' />

      <div className='ml-10 flex flex-col mb-5'>
        <div className='mb-2'>
          {renderTitle ? (
            renderTitle(row.title)
          ) : (
            <Label text={row.title} type={LabelType.H3} />
          )}
        </div>

        {renderContent ? (
          renderContent(row.date)
        ) : (
          <Label text={formatDate(row.date)} type={LabelType.LABEL_M} />
        )}
      </div>
    </div>
  ));

export const Timeline = memo(
  ({ renderTitle, renderContent, data }: InputProps) => (
    <div className='p-4'>{renderItem(data, renderTitle, renderContent)}</div>
  ),
);
