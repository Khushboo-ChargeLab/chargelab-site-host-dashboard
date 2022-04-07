import { memo } from 'react';
import { Card, DoughnutChart, Label, LabelType, Button, ButtonType } from '../_ui';
import { ButtonSize } from '../_ui/Button.component';
import { ChartData } from '../_ui/chart/types/Chart-Data.interface';

interface InputProps {
  data?:ChartData[];
}
export const ChargerStatusChart = memo(({
  data = [],
}: InputProps) => (
  <Card className='h-full'>
    <div className="flex w-full mb-4">
      <div className="flex w-1/2">
        <Label type={LabelType.H4} text="Charger Status" className='pb-6' />
      </div>
      <div className="flex justify-end w-1/2">
        <Button size={ButtonSize.SMALL} label="View chargers" type={ButtonType.Cancel} />
      </div>
    </div>
    <DoughnutChart items={data} className='flex h-32' />
  </Card>
    ));