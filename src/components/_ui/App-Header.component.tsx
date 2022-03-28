import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentNavigation } from '../../stores/selectors/app-navigation.selector';
import { Label, LabelType } from './Label.component';

export const AppHeader = () => {
  const current = useSelector(getCurrentNavigation);

  return (
    <div className="h-20 border-b border-silver5 pt-6 pb-6 pl-10 absolute left-60 right-0">
      <Label text={current.title} type={LabelType.H3} />
    </div>
  );
};
