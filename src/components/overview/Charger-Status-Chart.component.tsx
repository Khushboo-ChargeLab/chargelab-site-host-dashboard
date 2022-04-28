import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChargers } from '../../stores/selectors/charger.selector';
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
  const [chargerStatus, setChargerStatus] = useState<any>([]);
  const chargers = useSelector(selectChargers);

  useEffect(() => {
    if (chargers && chargers.length) {
      setChargerStatus([
        {
          label: 'Available',
          value: chargers.filter(
            (c) =>
              c.status === 'ONLINE' &&
              c.ports.some((d) => d.status === 'AVAILABLE'),
          ).length,
          color: '#7CB342',
        },
        {
          label: 'Charging',
          value: chargers.filter(
            (c) =>
              c.status === 'ONLINE' &&
              (c.ports.every((d) => d.status === 'IDLE') ||
                c.ports.every((d) => d.status === 'CHARGING')),
          ).length,
          color: '#039BE5',
        },
        {
          label: 'Offline',
          value: chargers.filter((c) => c.status === 'OFFLINE').length,
          color: '#FFB300',
        },
        {
          label: 'Coming soon',
          value: chargers.filter((c) => c.status === 'COMING_SOON').length,
          color: '#B0B8C1',
        },
      ]);
    }
  }, [chargers]);

  return (
    <Card className='h-full'>
      <div className='flex w-full mb-4'>
        <div className='flex w-1/2'>
          <Label type={LabelType.H4} text='Charger Status' className='pb-6' />
        </div>
        <div className='flex justify-end w-1/2'>
          <Button
            size={ButtonSize.SMALL}
            label='View chargers'
            type={ButtonType.Cancel}
          />
        </div>
      </div>
      <DoughnutChart items={chargerStatus} className='flex h-32' />
    </Card>
  );
});
