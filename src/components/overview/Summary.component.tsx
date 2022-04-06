import { useCallback } from 'react';
import {
 Card, DateTimePicker, Label, LabelType,
} from '../_ui';

export const Summary = () => {
  const dateChanged = useCallback((date:any) => {
    console.log('date changed', date);
  }, []);

return (
  <Card title="">
    <div className="block">
      <DateTimePicker showMonthYearPicker onChange={dateChanged} defaultDate={new Date()} />
    </div>
    <div className="flex items-center mt-4">
      <div className="block text-center w-60  h-36">
        <Label type={LabelType.BODY1} text="Fees collected" className="ml-15 pt-7" />
        <Label type={LabelType.H1} text="$246.20" className="ml-15 pt-4 pb-7" />
      </div>
      <div className="block ml-1 mr-1 divider">
        &nbsp;
      </div>
      <div className="block text-center w-60  h-36">
        <Label type={LabelType.BODY1} text="Energy used" className="ml-15 pt-7" />
        <Label type={LabelType.H1} text="805 kWh" className="ml-15 pt-4 pb-7" />
      </div>
      <div className="block ml-1 mr-1 divider">
        &nbsp;
      </div>
      <div className="block text-center w-60  h-36">
        <Label type={LabelType.BODY1} text="Sessions" className="ml-15 pt-7" />
        <Label type={LabelType.H1} text="48" className="ml-15 pt-4 pb-7" />
      </div>
    </div>
  </Card>
    );
};