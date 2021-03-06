import React from 'react';
import {
  Pill,
  Grid,
  Label,
  PILL_BG_COLOR,
  LabelType,
  Switch,
  Button,
  ButtonType,
  Snackbar,
  DateTimePicker,
  CheckBox,
  CheckBoxData,
  CheckBoxGroup,
  GroupDirection,
  RadioGroup,
  CheckBoxTree,
  Dropdown,
  DropdownType,
  ImageViewer,
  DoughnutChart,
  VerticalBarChart,
  useGlobalModalContext,
  MODAL_TYPES,
  DateRangePicker,
} from '.';
import { start } from '../../lib';
import { SessionStatusHistory } from '../Session/SessionStatusHistory.component';
import { ButtonSize } from './Button.component';
import { FormInput } from './Input.component';
import { Card } from './Card.component';
import { AlertPosition } from './snack-bar/Snack-Bar.component';
import { SessionDetail } from '../Session/SessionDetail.component';
import { convertToLocaleCurrency } from '../../utils/Currency.Util';
import { TimePriceSlider } from '../Pricing/TimePriceSlider.component';

const renderTimeRangeSlider = () => {
  const data = [
    {
      label: convertToLocaleCurrency(10.25),
      value: 6,
    },
    {
      label: convertToLocaleCurrency(88.35),
      value: 13,
    },
    {
      label: convertToLocaleCurrency(20.35),
      value: 20,
    },
  ];
  return (
    <div>
      <Card className='w-full h-40'>
        <TimePriceSlider
          blocks={data}
          onChange={(blocks: any) => {
            console.log('TimePriceSlider:', blocks);
          }}
        />
      </Card>
    </div>
  );
};

const renderChart = () => {
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
  const feeCollected = [
    {
      date: new Date('2022-01-01'),
      value: 0,
    },
    {
      date: new Date('2022-02-01'),
      value: 170,
    },
    {
      date: new Date('2022-03-01'),
      value: 720,
    },
    {
      date: new Date('2022-04-01'),
      value: 530,
    },
    {
      date: new Date('2022-05-01'),
      value: 600,
    },
    {
      date: new Date('2022-06-01'),
      value: 20,
    },
    {
      date: new Date('2022-07-01'),
      value: 880,
    },
    {
      date: new Date('2022-08-01'),
      value: 1000,
    },
    {
      date: new Date('2022-09-01'),
      value: 940,
    },
    {
      date: new Date('2022-10-01'),
      value: 30,
    },
    {
      date: new Date('2022-11-01'),
      value: 500,
    },
    {
      date: new Date('2022-12-01'),
      value: 1200,
    },
  ];
  return (
    <div>
      <Card className='w-1/3 h-52' title='Charger Status'>
        <DoughnutChart
          items={status}
          className='flex h-32'
          valueField='value'
          labelField='label'
          colorField='color'
        />
      </Card>
      <br />
      <Card className='flex h-60'>
        <VerticalBarChart
          items={feeCollected}
          className='flex h-52 w-full'
          dateField='date'
          valueField='value'
        />
      </Card>
      <br />
    </div>
  );
};

const renderDropdown = () => {
  const locations = [
    {
      label: 'All locations',
      selected: false,
    },
    {
      label: 'Hilton Kennedy',
      selected: false,
    },
    {
      label: 'Hilton Spring field',
      selected: false,
    },
    {
      label: 'A very loooooooooooooooong location',
      selected: false,
    },
  ];
  const Status = [
    {
      label: 'Available',
      selected: false,
    },
    {
      label: 'Charging',
      selected: false,
    },
    {
      label: 'Coming soon',
      selected: false,
    },
    {
      label: 'Out of order',
      selected: false,
    },
    {
      label: 'Offline',
      selected: false,
    },
    {
      label: 'Scheduled',
      selected: false,
    },
  ];
  const chargers = [
    { label: 'AD-21', selected: true },
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
    { label: 'AD-33', selected: false },
    { label: 'AD-34', selected: false },
    { label: 'AD-35', selected: false },
  ];
  const chargerTree = [
    {
      label: 'Hilton Kennedy',
      selected: false,
      children: [
        { label: 'FG-21', selected: true },
        { label: 'FG-22' },
        { label: 'FG-23' },
      ],
    },
    {
      label: 'Hilton Springfield',
      selected: false,
      children: [
        { label: 'BD-31', selected: true },
        { label: 'BD-32' },
        { label: 'BD-33' },
      ],
    },
    {
      label: 'Park A',
      selected: false,
      children: [
        { label: 'A-31', selected: true },
        { label: 'A-32' },
        { label: 'A-33' },
      ],
    },
    {
      label: 'Park B',
      selected: false,
      children: [
        { label: 'B-31', selected: true },
        { label: 'B-32' },
        { label: 'B-33' },
      ],
    },
    {
      label: 'Park C',
      selected: false,
      children: [
        { label: 'C-31', selected: false },
        { label: 'C-32' },
        { label: 'C-33' },
      ],
    },
  ];
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-4'>
        <Dropdown
          title='Location'
          headerWidth='auto'
          items={locations}
          onItemClick={(items: any, item: any, index: number) =>
            console.log(item, index)
          }
        />
        <Dropdown
          title='Status'
          items={Status}
          type={DropdownType.CHECKBOX}
          onItemClick={(items: any) => console.log(items)}
        />
        <Dropdown
          title='Charger'
          items={chargers}
          type={DropdownType.CHECKBOX}
          onItemClick={(items: any) => console.log(items)}
        />
      </div>
      <div>
        <Dropdown
          title='Select Charger'
          headerWidth={340}
          items={chargerTree}
          type={DropdownType.CHECKBOX_TREE}
          onItemClick={(items: any) => console.log(items)}
        />
      </div>
    </div>
  );
};

const renderCheckBox = () => (
  <div className='flex flex-row w-full'>
    <div className='flex flex-col basis-1/2 gap-5'>
      <CheckBox
        label='Time-of-use price'
        onChange={(checked: boolean) => console.log(checked)}
      />
      <CheckBoxGroup
        name='testcheckboxgroup'
        defaultItems={[
          { label: 'FG-21', selected: true },
          { label: 'FG-22', selected: true },
          { label: 'FG-23' },
        ]}
        onChange={(items: CheckBoxData[]) => {
          console.log(items);
        }}
      />
      <RadioGroup
        name='testradiogroup'
        direction={GroupDirection.Vertical}
        defaultItems={[
          { label: 'Toronto', selected: true },
          { label: 'Calgary' },
          { label: 'Vancouver' },
        ]}
        onChange={(items: CheckBoxData[]) => {
          console.log(items);
        }}
      />
    </div>
    <div className='basis-1/2'>
      <CheckBoxTree
        defaultNodes={[
          {
            label: 'Hilton Kennedy',
            selected: false,
            children: [
              { label: 'FG-21', selected: true },
              { label: 'FG-22' },
              { label: 'FG-23' },
            ],
          },
          {
            label: 'Hilton Springfield',
            selected: false,
            children: [
              { label: 'BD-31', selected: true },
              { label: 'BD-32' },
              { label: 'BD-33' },
            ],
          },
        ]}
        onChange={(nodes: CheckBoxData[]) => console.log('onChange:', nodes)}
      />
    </div>
  </div>
);

export const Wiki = () => {
  const { showModal } = useGlobalModalContext();

  const history = [
    { title: 'Coming soon', date: new Date() },
    { title: 'Available', date: new Date() },
    { title: 'Preparing', date: new Date() },
    { title: 'Charging', date: new Date() },
  ];

  const showSnackbar = () => {
    Snackbar.show({
      message:
        'Snackbar successfully shown up with close button at right pls make sure you have all the details',
      position: AlertPosition.TOP,
    });
  };

  const showSnackbarBottom = () => {
    Snackbar.show({
      message:
        'Snackbar successfully shown up with close button at right pls make sure you have all the details',
      position: AlertPosition.BOTTOM,
    });
  };

  const showConfirmModal = () => {
    showModal(MODAL_TYPES.ALERT_MODAL, {
      title: 'Stop session',
      iconn: 2,
      buttons: [
        {
          label: 'Cancel',
          type: ButtonType.Cancel,
          onClick: () => {},
        },
        {
          label: 'Confirm',
          type: ButtonType.Primary,
          onClick: () => {},
        },
      ],
    });
  };

  const handleShowModal = () => {
    showModal(MODAL_TYPES.INFO_MODAL, {
      title: 'Session detail',
      small: false,
      body: <Wiki />,
    });
  };

  return (
    <>
      <FormInput />
      {renderChart()}
      <br />
      {renderTimeRangeSlider()}
      <div className='block mb-4'>
        <div className='inline-block'>
          <Label text='Medium' type={LabelType.LABEL_M} />
        </div>
        <div className='inline-block ml-4'>
          <Label text='H3' type={LabelType.H3} />
        </div>
        <div className='inline-block ml-4'>
          <Label text='H7' type={LabelType.H7} />
        </div>
        <div className='inline-block ml-4'>
          <Label text='H5' type={LabelType.H5} />
        </div>
        <div className='inline-block ml-4'>
          <Label text='H4' type={LabelType.H4} />
        </div>
        <div className='inline-block ml-4'>
          <Label text='Error' type={LabelType.ERROR} />
        </div>
        <div className='inline-block ml-4'>
          <Label text='BODY3' type={LabelType.BODY3} />
        </div>
        <div className='inline-block ml-4'>
          <Label text='BODY2' type={LabelType.BODY2} />
        </div>
      </div>
      <hr />
      <div className='block mt-4 mb-4 bg-white p-5'>{renderDropdown()}</div>
      <hr />
      <div className='block mt-4 mb-4'>
        <div className='inline-block'>
          Month Picker :
          <DateTimePicker
            showMonthYearPicker
            inputBG='bg-white'
            defaultDate={new Date()}
          />
        </div>

        <div className='inline-block'>
          Date Picker :
          <DateTimePicker
            inputBG='bg-white'
            format='LLL dd, yyyy'
            defaultDate={new Date()}
          />
        </div>

        <div className='inline-block'>
          Range Picker#1 :
          <DateRangePicker inputBG='bg-white' format='LLL dd yyyy' />
        </div>

        <div className='inline-block'>
          Range Picker#2:
          <DateRangePicker inputBG='bg-white' format='LLL dd yyyy' />
        </div>
      </div>
      <hr />
      <div className='flex pt-6 pb-4'>
        <Card title='Recent sessions'>
          <Grid
            columns={[
              { key: 'id', title: 'Charger Name' },
              { key: 'location', title: 'Location' },
              {
                key: 'status',
                title: 'Status',
                component: (row: any) => (
                  <Pill
                    label={row.status}
                    bgColor={
                      row.status === 'Available'
                        ? PILL_BG_COLOR.GREEN
                        : PILL_BG_COLOR.RED
                    }
                  />
                ),
              },
            ]}
            data={[
              { id: 'AD-01', location: 'UAT', status: 'Available' },
              { id: 'AD-02', location: 'DEV', status: 'Hidden' },
            ]}
            totalPage={9}
            primaryKey='id'
          />
        </Card>
      </div>
      <hr />
      <div className='flex pt-6 pb-4 bg-white'>
        <Switch
          enableLabel='Enabled'
          disableLabel='Disabled'
          onChange={(checked: boolean) => console.log('Switch:', checked)}
        />

        <Switch
          enableLabel='Enabled'
          disableLabel='Disabled'
          className='ml-10'
          segmented
          options={['Company', 'Individual', 'N/A']}
          onChange={(checked: boolean) => console.log('Switch:', checked)}
        />
      </div>
      <hr />
      <div className='block mt-4 mb-4'>
        <div className='inline-block'>
          <Pill label='Available' bgColor={PILL_BG_COLOR.GREEN} />
        </div>
        <div className='inline-block ml-4'>
          <Pill label='In Use' bgColor={PILL_BG_COLOR.BLUE} />
        </div>
        <div className='inline-block ml-4'>
          <Pill label='Hidden' bgColor={PILL_BG_COLOR.RED} />
        </div>
        <div className='inline-block ml-4'>
          <Pill label='UnAvailable' bgColor={PILL_BG_COLOR.GREY} />
        </div>
        <div className='inline-block ml-4'>
          <Pill label='Button' isButton bgColor={PILL_BG_COLOR.PURPLE} />
        </div>
      </div>
      <hr />
      <div className='block mt-6 mb-4'>
        <Grid
          columns={[
            { key: 'id', title: 'Charger Name' },
            { key: 'location', title: 'Location' },
            {
              key: 'status',
              title: 'Status',
              component: (row: any) => (
                <Pill
                  label={row.status}
                  bgColor={
                    row.status === 'Available'
                      ? PILL_BG_COLOR.GREEN
                      : PILL_BG_COLOR.RED
                  }
                />
              ),
            },
          ]}
          data={[
            { id: 'AD-01', location: 'UAT', status: 'Available' },
            { id: 'AD-02', location: 'DEV', status: 'Hidden' },
          ]}
          totalPage={9}
          primaryKey='id'
        />
      </div>
      <hr />
      <div className='block mt-6 mb-4'>
        <SessionStatusHistory data={history} />
      </div>
      <hr />
      <div className='block mt-6 mb-4'>
        <input
          className='cursor-pointer'
          type='button'
          onClick={handleShowModal}
          value='Show Modal'
        />
        <input
          className='cursor-pointer ml-5'
          type='button'
          onClick={showConfirmModal}
          value='Confirmation Modal'
        />
      </div>
      <hr />

      <div className='flex felx-row mt-6 mb-4 items-center'>
        <Button label='Save' onClick={() => console.log('Save clicked')} />
        <Button label='Cancel' type={ButtonType.Cancel} className='ml-2' />
        <Button label='Disabled' type={ButtonType.Disabled} className='ml-2' />
        <Button
          label='INFO'
          type={ButtonType.Info}
          size={ButtonSize.SMALL}
          className='ml-2'
        />
        <Button label='Alert' type={ButtonType.Alert} className='ml-2' />
        <Button
          label='Start'
          type={ButtonType.Icon}
          icon={start}
          className='ml-2'
        />
      </div>
      <hr />
      <div className='flex felx-row mt-6 mb-6'>
        <Button
          label='Snackbar Top'
          onClick={showSnackbar}
          type={ButtonType.Primary}
        />

        <Button
          label='Snackbar Bottom'
          onClick={showSnackbarBottom}
          type={ButtonType.Info}
          className='ml-2'
        />
      </div>
      <hr />
      <div className='flex felx-row mt-6'>{renderCheckBox()}</div>

      <hr />
      <div className='flex felx-row mt-6 mb-4'>
        Empty
        <ImageViewer className='mr-6' />
        From URL
        <ImageViewer
          className='mr-6'
          width={120}
          src='https://chargelabservice.s3.us-east-2.amazonaws.com/stations/generic/Delta+AC+Mini.jpg'
        />
        Profile
        <ImageViewer width={40} className='mr-6' />
        Profile Selector
        <ImageViewer profile className='mr-6' />
        Circle Image
        <ImageViewer
          className='mr-6'
          width={120}
          circle
          src='https://chargelabservice.s3.us-east-2.amazonaws.com/stations/generic/Delta+AC+Mini.jpg'
        />
      </div>
    </>
  );
};
