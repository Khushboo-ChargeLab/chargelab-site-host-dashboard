import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alert, charging } from '../../lib';
import { fetchSessions } from '../../stores/reducers/sessons.reducer';
import {
 Card, Grid, Pill, PILL_BG_COLOR, Button, ButtonType, Label, LabelType, Dropdown, CustomDatePicker,
} from '../_ui';
import { ButtonSize } from '../_ui/Button.component';
import { GridColumnType } from '../_ui/grid/enums/Grid-Column-Type.enum';

export const Sessions = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const refreshGrid = useCallback(async (page:number) => {
    console.log('refreshGrid', page, filter);
    setCurrentPage(page);
    dispatch(fetchSessions({ page, ...filter }));
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
            items={[{ label: 'AD-21', selected: false },
            { label: 'AD-22', selected: false },
            { label: 'AD-23', selected: false },
            { label: 'AD-24', selected: false },
            { label: 'AD-25', selected: false },
            { label: 'AD-26', selected: false },
            { label: 'AD-27', selected: false },
            { label: 'AD-28', selected: false },
            { label: 'AD-29', selected: false },
            { label: 'AD-30', selected: false },
            { label: 'AD-31', selected: false },
            { label: 'AD-32', selected: false },
            { label: 'AD-25', selected: false },
            { label: 'AD-26', selected: false },
            { label: 'AD-27', selected: false },
            { label: 'AD-28', selected: false },
            { label: 'AD-29', selected: false },
            { label: 'AD-30', selected: false },
            { label: 'AD-31', selected: false },
            { label: 'AD-32', selected: false },
            { label: 'AD-33', selected: false },
            { label: 'AD-34', selected: false },
            { label: 'AD-35', selected: false }]}
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
        columns={[
            { key: 'id', title: 'Authentication type' },
            { key: 'location', title: 'Location' },
            {
 key: 'charger',
              title: 'Charger',
            component: (row: any) => (
              <Pill
                label={row.charger}
                className="text-grey6"
                bgColor={PILL_BG_COLOR.GREY}
              />
            ),
          },
            { key: 'start', title: 'Start Time', type: GridColumnType.DATETIME },
            {
              key: 'status',
              title: 'Status',
              component: (row: any) => (
                <Label
                  text={row.status}
                  type={LabelType.BODY3}
                  icon={row.status === 'Failed' ? alert : charging}
                />
              ),
            },
            { key: 'energy', title: 'Energy used' },
            { key: 'cost', title: 'Cost', type: GridColumnType.CURRENCY },
          ]}
        data={[
            {
 id: 'AD-01', location: 'UAT', charger: 'DR-41', start: '01/24/2022 10:20:33 PM', cost: 7.25, energy: '12.9 kWh', status: 'Charging',
},
            {
 id: 'AD-02', location: 'DEV', charger: 'DR-55', status: 'Failed',
},
          ]}
        totalPage={9}
        primaryKey="id"
      />
    </Card>
    );
        };