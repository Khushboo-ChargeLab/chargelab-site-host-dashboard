import { Card, DoughnutChart, Label, LabelType, Button, ButtonType } from '../_ui';
import { ButtonSize } from '../_ui/Button.component';

export const ChargerStatusChart = () => {
  const status = [
    {
      label: 'Available',
      value: 4,
      color: '#7CB342',
    },
    {
      label: 'Charging',
      value: 1,
      color: '#039BE5',
    },
    {
      label: 'Offline',
      value: 3,
      color: '#FFB300',
    },
    {
      label: 'Coming soon',
      value: 2,
      color: '#B0B8C1',
    },
  ];
  return (
    <Card className='h-full'>
      <div className="flex w-full mb-4">
        <div className="flex w-1/2">
          <Label type={LabelType.H4} text="Charger Status" className='pb-6' />
        </div>
        <div className="flex justify-end w-1/2">
          <Button size={ButtonSize.SMALL} label="View chargers" type={ButtonType.Cancel} />
        </div>
      </div>
      <DoughnutChart items={status} className='flex h-32' />
    </Card>
    );
  };