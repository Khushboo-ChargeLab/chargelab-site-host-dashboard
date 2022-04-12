import { useTranslation } from 'react-i18next';
import { useFetch } from '../../hooks';
import { Label, Card, Spinner, LabelType } from '../_ui';
import { Charger, ChargerList } from '../../stores/types/Chargers.interface';
import { alert, charging } from '../../lib';
import { CHARGER_STATUS } from './Constants';

export const Chargers = () => {
  const { data, error, isLoading } = useFetch<ChargerList>(
    '/internal/core/v2/chargers',
  );
  const { t } = useTranslation();

  const getTroubleChargers = () => {
    let count = 0;
    data?.entries.forEach((charger) => {
      if (
        charger.status === CHARGER_STATUS.OUT_OF_ORDER ||
        charger.status === CHARGER_STATUS.OFFLINE
      ) {
        count += 1;
      }
    });
    return count;
  };
  const renderChargerOverview = () => {
    const troubleNum = getTroubleChargers();
    return (
      <div>
        {isLoading && <Spinner />}
        {data && (
          <Card className='border-2 border-grey2' title={t('CHARGER OVERVIEW')}>
            <Label
              text={`${troubleNum > 0 ? t('All Chargers are online') : t('')}`}
              type={LabelType.BODY3}
              icon={row.status === 'Failed' ? alert : charging}
            />
          </Card>
        )}
      </div>
    );
  };

  const renderChargerTable = () => {
    if (!data) return null;
    const { totalCount, entries } = data;
    return <div />;
  };

  return (
    <Card>
      {renderChargerOverview()}
      {renderChargerTable()}
    </Card>
  );
};
