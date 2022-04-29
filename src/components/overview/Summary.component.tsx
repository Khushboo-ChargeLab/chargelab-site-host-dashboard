import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../stores/reducers/stats.reducer';
import { selectRecentStats } from '../../stores/selectors/stats.selector';
import { convertToLocaleCurrency } from '../../utils/Currency.Util';
import { formatDate } from '../../utils/Date.Util';
import { convertToThousandSeperator } from '../../utils/Number.Util';
import {
  Card, DateTimePicker, Label, LabelType,
} from '../_ui';

export const Summary = () => {
  const dispatch = useDispatch();
  const statsSelector = useSelector(selectRecentStats);

  const dateChanged = useCallback((date:any) => {
    dispatch(fetchStatistics(
    {
      fromDate: formatDate(date, 'yyyy-MM'),
      toDate: formatDate(date, 'yyyy-MM'),
      currency: 'CAD',
    }));
  }, [dispatch]);

  const handleFeesCollectedDisplay = (statsSelectorObj: any) => {
     return statsSelectorObj?.stats?.[0] ? convertToLocaleCurrency(statsSelectorObj.stats[0].revenue, statsSelectorObj.stats[0].revenueCurrency) : 0;
  };

  const handleEnergyUsedDisplay = (statsSelectorObj: any) => {
    const statsObj = statsSelectorObj?.stats?.[0];
    if (statsObj) {
      return statsObj.energyDeliveredKWh === 0 ? '0.0 kWh' : `${convertToThousandSeperator(statsObj.energyDeliveredKWh)} kWh`;
    }
    return '0';
  };

  useEffect(() => {
    dispatch(fetchStatistics(
    {
      fromDate: formatDate(new Date(), 'yyyy-MM'),
      toDate: formatDate(new Date(), 'yyyy-MM'),
      locationId: null,
      currency: 'CAD',
    }));
  }, [dispatch]);

return (
  <Card title="">
    <div className="block">
      <DateTimePicker showMonthYearPicker onChange={dateChanged} defaultDate={new Date()} />
    </div>
    <div className="flex items-center mt-4">
      <div className="block text-center w-60  h-36">
        <Label type={LabelType.BODY1} text="Fees collected" className="ml-15 pt-7" />
        <Label type={LabelType.H1} text={handleFeesCollectedDisplay(statsSelector)} className="ml-15 pt-4 pb-7" />
      </div>
      <div className="block ml-1 mr-1 divider">
        &nbsp;
      </div>
      <div className="block text-center w-60  h-36">
        <Label type={LabelType.BODY1} text="Energy used" className="ml-15 pt-7" />
        <Label type={LabelType.H1} text={handleEnergyUsedDisplay(statsSelector)} className="ml-15 pt-4 pb-7" />
      </div>
      <div className="block ml-1 mr-1 divider">
        &nbsp;
      </div>
      <div className="block text-center w-60  h-36">
        <Label type={LabelType.BODY1} text="Sessions" className="ml-15 pt-7" />
        <Label type={LabelType.H1} text={statsSelector?.stats?.[0] ? statsSelector?.stats?.[0]?.transactions : '0'} className="ml-15 pt-4 pb-7" />
      </div>
    </div>
  </Card>
    );
};