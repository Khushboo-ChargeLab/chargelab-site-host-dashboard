import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
import { RoutePath } from '../../routes';

interface InputProps {
  data?: ChartData[];
}

export const ChargerStatusChart = memo(({ data = [] }: InputProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleViewChargersClick = () => {
    navigate(`../${RoutePath.CHARGERS}`, { replace: true });
  };
  return (
    <Card className='h-full'>
      <div className='flex w-full mb-4'>
        <div className='flex w-1/2 items-center'>
          <Label
            type={LabelType.H4}
            text={t('overview_charger_status')}
            className='pl-4'
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
