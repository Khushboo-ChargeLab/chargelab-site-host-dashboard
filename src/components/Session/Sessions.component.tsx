import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alert, completed } from '../../lib';
import { fetchSessions } from '../../stores/reducers/sessons.reducer';
import { selectChargers } from '../../stores/selectors/charger.selector';
import { selectRecentSessions } from '../../stores/selectors/session.selector';
import {
 Card, Grid, Pill, PILL_BG_COLOR, Button, ButtonType, Label, LabelType, Dropdown, CustomDatePicker, ModalForm,
} from '../_ui';
import { ButtonSize } from '../_ui/Button.component';
import { GridColumnType } from '../_ui/grid/enums/Grid-Column-Type.enum';
import { SessionDetail } from './SessionDetail.component';

export const Sessions = () => {
  const dispatch = useDispatch();
  const recentSessions = useSelector(selectRecentSessions);
  const chargers = useSelector(selectChargers);

  const [filter, setFilter] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const refreshGrid = useCallback(async (page:number) => {
    setCurrentPage(page);
    if (page === 1) {
      dispatch(fetchSessions({ page, ...filter }));
    }
// Fetch data
  }, [filter, dispatch]);

  const dateChanged = useCallback((selectedDate:any) => {
    setFilter({
      ...filter,
      dateRange: selectedDate,
    });
  }, [filter]);

  const chargerSelected = useCallback((item: any) => {
    setFilter({
      ...filter,
      charger: item,
    });
  }, [filter]);

  const rowClick = useCallback((rowData: any) => {
    const chargerStatusHistory = [
    { title: 'Alert', date: new Date() },
    { title: 'Completed', date: new Date() },
    { title: 'Charging', date: new Date() },
    { title: 'Start', date: new Date() },
  ];

  const SessionDetailInfo = {
    startTime: new Date(2022, 3, 8, 13, 0),
    endTime: new Date(2022, 3, 8, 13, 31),
    duration: '40 mins',
    authenticationType: 'User',
    charger: 'AD-24',
    connector: 'J1772',
    connectorSide: 'Left',
    connectorUrl: 'url',
    location: 'Hilton Kennedy',
    address: '45 Kennedy St, Toronto, ON, M2M 1R1',
    kwhUsed: 13.0,
    cost: 7.25,
    statusHistory: chargerStatusHistory,
  };
    ModalForm.show({
      title: 'Session detail',
      body: (<SessionDetail sessionData={SessionDetailInfo} />),
    });
   console.log(rowData);
  }, []);

  useEffect(() => {
    refreshGrid(1);
  }, [refreshGrid]);

  return (
    <Card title="Recent sessions">
      <div className="flex mt-3 mb-8 w-full">
        <div className="flex w-4/5">
          <Dropdown
            title='Charger'
            headerWidth='auto'
            items={chargers}
            label="name"
            onItemClick={chargerSelected}
          />
          <CustomDatePicker format="MMM d,yyyy" className='ml-2' onChange={dateChanged} />
        </div>
        <div className="flex justify-end w-1/5">
          <Button size={ButtonSize.SMALL} label="Export CSV" type={ButtonType.Cancel} />
        </div>
      </div>
      <Grid
        onRowClick={rowClick}
        pageIndex={currentPage}
        loadPage={refreshGrid}
        local
        columns={[
            { key: 'port.charger.location.name', title: 'Location' },
            { key: 'port.charger.name',
              title: 'Charger',
            component: (row: any) => (
              <Pill
                width="200"
                label={row.port.charger.name}
                className="text-grey6"
                bgColor={PILL_BG_COLOR.LIGHT}
                labelType={LabelType.LABEL_S_G6}
              />
            ),
          },
            { key: 'createTime|startTime', title: 'Start Time', type: GridColumnType.DATETIME, format: 'LLL dd, HH:mm a' },
            {
              key: 'status',
              title: 'Status',
              component: (row: any) => (
                <Label
                  text={(row.status || 'Completed').replace('ENDED', 'Completed')}
                  type={LabelType.BODY3}
                  icon={row.status === 'Failed' ? alert : completed}
                />
              ),
            },
            { key: 'consumedEnergyJoules', title: 'Energy used' },
            { key: 'billedTotalAmount', title: 'Cost', type: GridColumnType.CURRENCY },
          ]}
        data={recentSessions}
        totalPage={Math.ceil(recentSessions.length / 20)}
        primaryKey="id"
      />
    </Card>
    );
        };