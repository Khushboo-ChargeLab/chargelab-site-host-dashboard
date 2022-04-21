import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alert, charging } from '../../lib';
import { fetchSessions } from '../../stores/reducers/sessons.reducer';
import {
  Card,
  Grid,
  Pill,
  PILL_BG_COLOR,
  Button,
  ButtonType,
  Label,
  LabelType,
  Dropdown,
  CustomDatePicker,
  ModalForm,
  DropdownType,
} from '../_ui';
import { ButtonSize } from '../_ui/Button.component';
import { GridColumnType } from '../_ui/grid/enums/Grid-Column-Type.enum';
import { SessionDetail } from './SessionDetail.component';

export const Sessions = () => {
  const chargerDummyData = ([{ label: 'AD-21', selected: false },
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
  { label: 'AD-35', selected: false }]);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [chargerData, setChargerData] = useState(chargerDummyData);

  const refreshGrid = useCallback(
    async (page: number) => {
      setCurrentPage(page);
      dispatch(fetchSessions({ page, ...filter }));
      // Fetch data
    },
    [filter, dispatch],
  );

  const dateChanged = useCallback(
    (selectedDate: any) => {
      setFilter({
        ...filter,
        dateRange: selectedDate,
      });
    },
    [filter],
  );

  const handleClearAllClick = () => {
    setChargerData(chargerDummyData);
  };

  const renderClearAllButton = () => {
    const foundSelectedCharger = chargerData.find((charger) => charger.selected);
    if (foundSelectedCharger) {
      return (
        <button
          type='button'
          className='pl-2 text-left'
          onClick={handleClearAllClick}
        >
          <Label type={LabelType.DROPDOWN_ITEM_SELECTED} text='Clear all' />
        </button>
      );
    }
  };

  const handlePillClick = (chargerToBeRemoved: any) => {
    const newChargerList = chargerData.map((cd) => {
      if (cd.label === chargerToBeRemoved.label) {
        return { ...cd, selected: false };
      }
      return cd;
    });
    setChargerData(newChargerList);
  };

  const renderSelectedCharger = () => {
    return chargerData.filter((charger: any) => charger.selected)
      .map((c: any, index) => {
        return (
          <Pill
            // eslint-disable-next-line react/no-array-index-key
            key={`${c.label}-${index}`}
            onClick={() => handlePillClick(c)}
            label={c.label}
            isButton
            width='auto'
            labelType={LabelType.PILL_DROPDOWN}
          />
        );
      });
  };

  const handleDropDownColor = () => {
    return chargerData.filter((charger: any) => charger.selected).length > 0 ? 'bg-grey6/60' : '';
  };

  const chargerSelected = useCallback(
    (item: any) => {
      setFilter({
        ...filter,
        charger: item,
      });
    setChargerData(item);
    },
    [filter],
  );

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
      body: <SessionDetail sessionData={SessionDetailInfo} />,
    });
    console.log(rowData);
  }, []);

  useEffect(() => {
    refreshGrid(1);
  }, [refreshGrid]);

  return (
    <Card title='Recent sessions'>
      <div className='flex mt-3 mb-8 w-full'>
        <div className='flex w-4/5'>
          <Dropdown
            title='Charger'
            headerWidth='auto'
            items={chargerData}
            type={DropdownType.CHECKBOX}
            onItemClick={chargerSelected}
            className={handleDropDownColor()}
          />
          <CustomDatePicker
            format='MMM d,yyyy'
            className='ml-2'
            onChange={dateChanged}
          />
        </div>
        <div className='flex justify-end w-1/5'>
          <Button
            size={ButtonSize.SMALL}
            label='Export CSV'
            type={ButtonType.Cancel}
          />
        </div>
      </div>
      <div className='mt-3 mb-8 inline-flex flex-wrap gap-1'>
        {renderSelectedCharger()}
        {renderClearAllButton()}
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
                className='text-grey6'
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
            id: 'AD-01',
            location: 'UAT',
            charger: 'DR-41',
            start: '01/24/2022 10:20:33 PM',
            cost: 7.25,
            energy: '12.9 kWh',
            status: 'Charging',
          },
          {
            id: 'AD-02',
            location: 'DEV',
            charger: 'DR-55',
            status: 'Failed',
          },
        ]}
        totalPage={9}
        primaryKey='id'
      />
    </Card>
  );
};
