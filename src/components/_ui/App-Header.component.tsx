import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge, ImageViewer } from '.';
import { bell } from '../../lib';
import { Label, LabelType } from './Label.component';
import { routes, getBaseRoute, RoutePath, getRouteTitle } from '../../routes';

export const AppHeader = () => {
  const currentLocation = useLocation();
  const { t } = useTranslation();
  return (
    <div className='bg-dashboard h-20 border-b border-silver5 pt-6 pb-6 pl-10 left-60 right-0 flex z-50 absolute'>
      <div className='inline-block w-1/2'>
        <Label
          text={t(getRouteTitle(currentLocation.pathname))}
          type={LabelType.H3}
        />
      </div>
      <div className='flex justify-end items-center w-1/2 text-right pr-10'>
        {/* hide for sprint 1
        <Badge label="8" icon={bell} /> */}
        <ImageViewer circle className='w-10 h-10 ml-3' />
      </div>
    </div>
  );
};
