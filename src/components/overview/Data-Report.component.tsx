import { Button, Card, DateTimePicker, Switch, VerticalBarChart } from '../_ui';
import { ButtonSize, ButtonType } from '../_ui/Button.component';
import './Data-Report.component.scss';

const feeCollected = [
  {
    date: new Date('2022-01-10'),
    value: 10,
  },
  {
    date: new Date('2022-02-10'),
    value: 170,
  },
  {
    date: new Date('2022-03-10'),
    value: 720,
  },
  {
    date: new Date('2022-04-10'),
    value: 530,
  },
  {
    date: new Date('2022-05-10'),
    value: 600,
  },
  {
    date: new Date('2022-06-10'),
    value: 20,
  },
  {
    date: new Date('2022-07-10'),
    value: 880,
  },
  {
    date: new Date('2022-08-10'),
    value: 1000,
  },
  {
    date: new Date('2022-09-10'),
    value: 940,
  },
  {
    date: new Date('2022-10-10'),
    value: 30,
  },
  {
    date: new Date('2022-11-10'),
    value: 500,
  },
  {
    date: new Date('2022-12-10'),
    value: 1200,
  },
];

export const DataReport = () => (
  <Card>
    <div className="flex mt-3 mb-8 w-full">
      <div className="flex w-2/5">
        <Switch
          enableLabel='Enabled'
          disableLabel='Disabled'
          segmented
          options={['Fees collected', 'Energy used', 'Sessions']}
          onChange={(checked: boolean) => console.log('Switch:', checked)}
        />
      </div>
      <div className='flex justify-end w-3/5'>
        <DateTimePicker white dateRange dateRangeMove format='LLL dd yyyy' defaultDate={new Date()} />
        <Button size={ButtonSize.SMALL} label="Export CSV" type={ButtonType.Cancel} className='ml-4' />
      </div>
    </div>
    <VerticalBarChart items={feeCollected} className='flex h-52 w-full' dateField='date' valueField='value' />
  </Card>
    );