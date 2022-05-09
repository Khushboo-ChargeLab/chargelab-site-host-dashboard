import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  chargers,
  chargerSelected,
  overview,
  overviewSelected,
} from '../../lib';
import { setCurrentNavigation } from '../../stores/reducers/app-navigation.reducer';
import { AppNavigator } from '../../stores/types/App-Navigator.interface';
import {
  Card,
  DoughnutChart,
  Label,
  LabelType,
  Button,
  ButtonType,
} from '../_ui';
import { ButtonSize } from '../_ui/Button.component';
import { ChartData } from '../_ui/chart/types/Chart-Data.interface';

interface InputProps {
  data?: ChartData[];
}

export const ChargerStatusChart = memo(({ data = [] }: InputProps) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();
  const chargerPageNavigation: AppNavigator = {
    selectedIcon: chargerSelected,
    header: 'CHARGER MANAGEMENT',
    path: '/chargers',
    title: 'Chargers',
    icon: chargers,
  };
  const handleViewChargersClick = () => {
    dispatch(setCurrentNavigation(chargerPageNavigation));
    history.push(chargerPageNavigation.path || '/');
  };
  return (
    <Card className='h-full'>
      <div className='flex w-full mb-4'>
        <div className='flex w-1/2'>
          <Label
            type={LabelType.H4}
            text={t('overview_charger_status')}
            className='pb-6'
          />
        </div>
        <div className='flex justify-end w-1/2'>
          <Button
            size={ButtonSize.SMALL}
            label='View chargers'
            type={ButtonType.Cancel}
            onClick={() => handleViewChargersClick()}
          />
        </div>
      </div>
      <DoughnutChart items={data} className='flex h-32' />
    </Card>
  );
});
