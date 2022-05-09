import React from 'react';
import { useSelector } from 'react-redux';
import { Badge, ImageViewer } from '.';
import { bell } from '../../lib';
import { getCurrentNavigation } from '../../stores/selectors/app-navigation.selector';
import { Label, LabelType } from './Label.component';

export const AppHeader = () => {
  const current = useSelector(getCurrentNavigation);

  return (
    <div className='h-20 border-b border-silver5 pt-6 pb-6 pl-10 absolute left-60 right-0 flex'>
      <div className='inline-block w-1/2'>
        <Label text={current.title} type={LabelType.H3} />
      </div>
      <div className='flex justify-end items-center w-1/2 text-right pr-10'>
        {/* hide for sprint 1
        <Badge label="8" icon={bell} /> */}
        <ImageViewer circle className='w-10 h-10 ml-3' />
      </div>
    </div>
  );
};
