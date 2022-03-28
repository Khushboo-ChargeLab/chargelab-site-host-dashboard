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
  ModalForm,
  Snackbar,
  DateTimePicker,
  CheckBox,
  CheckBoxData,
  CheckBoxGroup,
  GroupDirection,
  RadioGroup,
  CheckBoxTree,
  ImageViewer,
} from '.';
import { SessionStatusHistory } from '../Session/SessionStatusHistory.component';
import { ButtonSize } from './Button.component';
import { AlertPosition } from './snack-bar/Snack-Bar.component';

const renderCheckBox = () => (
  <div className="flex flex-row w-full">
    <div className="flex flex-col basis-1/2 gap-5">
      <CheckBox
        label="Time-of-use price"
        onChange={(checked: boolean) => console.log(checked)}
      />
      <CheckBoxGroup
        name="testcheckboxgroup"
        defaultItems={[
          { label: 'FG-21', isChecked: true },
          { label: 'FG-22', isChecked: true },
          { label: 'FG-23' },
        ]}
        onChange={(items: CheckBoxData[]) => {
          console.log(items);
        }}
      />
      <RadioGroup
        name="testradiogroup"
        direction={GroupDirection.Vertical}
        defaultItems={[
          { label: 'Toronto', isChecked: true },
          { label: 'Calgary' },
          { label: 'Vancouver' },
        ]}
        onChange={(items: CheckBoxData[]) => {
          console.log(items);
        }}
      />
    </div>
    <div className="basis-1/2">
      <CheckBoxTree
        defaultNodes={[
          {
            label: 'Hilton Kennedy',
            isChecked: false,
            children: [
              { label: 'FG-21', isChecked: true },
              { label: 'FG-22' },
              { label: 'FG-23' },
            ],
          },
          {
            label: 'Hilton Springfield',
            isChecked: false,
            children: [
              { label: 'BD-31', isChecked: true },
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
  const history = [
    { title: 'COMING_SOON', date: new Date() },
    { title: 'AVAILABLE', date: new Date() },
    { title: 'PREPARING', date: new Date() },
    { title: 'CHARGING', date: new Date() },
  ];

  const showSnackbar = () => {
    Snackbar.show({
      message: 'Snackbar successfully shown up with close button at right pls make sure you have all the details',
      position: AlertPosition.TOP,
    });
  };

  const showSnackbarBottom = () => {
    Snackbar.show({
      message: 'Snackbar successfully shown up with close button at right pls make sure you have all the details',
      position: AlertPosition.BOTTOM,
    });
  };

  const showConfirmModal = () => {
    ModalForm.confirm({
      title: 'Stop session',
      alertType: 2,
    });
  };
  const showModal = () => {
    ModalForm.show({
      title: 'Session detail',
      small: false,
      body: (<Wiki />),
    });
  };
  return (
    <>
      <div className="block mb-4">
        <div className="inline-block">
          <Label text="Medium" type={LabelType.LABEL_M} />
        </div>
        <div className="inline-block ml-4">
          <Label text="H3" type={LabelType.H3} />
        </div>
        <div className="inline-block ml-4">
          <Label text="H7" type={LabelType.H7} />
        </div>
        <div className="inline-block ml-4">
          <Label text="H5" type={LabelType.H5} />
        </div>
        <div className="inline-block ml-4">
          <Label text="H4" type={LabelType.H4} />
        </div>
        <div className="inline-block ml-4">
          <Label text="Error" type={LabelType.ERROR} />
        </div>
        <div className="inline-block ml-4">
          <Label text="BODY3" type={LabelType.BODY3} />
        </div>
        <div className="inline-block ml-4">
          <Label text="BODY2" type={LabelType.BODY2} />
        </div>
      </div>
      <hr />
      <div className="block mt-4 mb-4">
        <div className="inline-block">
          Month Picker :
          <DateTimePicker
            showMonthYearPicker
            white
          />
        </div>

        <div className="inline-block">
          Date Picker :
          <DateTimePicker white format="LLL dd, yyyy" />
        </div>

        <div className="inline-block">
          Range Picker#1 :
          <DateTimePicker white dateRange format="LLL dd yyyy" />
        </div>

        <div className="inline-block">
          Range Picker#2:
          <DateTimePicker white dateRange dateRangeMove format="LLL dd yyyy" />
        </div>
      </div>
      <hr />
      <div className="block mt-4 mb-4">
        <div className="inline-block">
          <Pill label="Available" bgColor={PILL_BG_COLOR.GREEN} />
        </div>
        <div className="inline-block ml-4">
          <Pill label="In Use" bgColor={PILL_BG_COLOR.BLUE} />
        </div>
        <div className="inline-block ml-4">
          <Pill label="Hidden" bgColor={PILL_BG_COLOR.RED} />
        </div>
        <div className="inline-block ml-4">
          <Pill label="UnAvailable" bgColor={PILL_BG_COLOR.GREY} />
        </div>
        <div className="inline-block ml-4">
          <Pill label="Button" isButton bgColor={PILL_BG_COLOR.PURPLE} />
        </div>
      </div>
      <hr />
      <div className="block mt-6 mb-4">
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
          primaryKey="id"
        />
      </div>
      <hr />
      <div className="block mt-6 mb-4">
        <SessionStatusHistory data={history} />
      </div>
      <div className="block mt-6 mb-4">
        <Switch
          enableLabel="Enabled"
          disableLabel="Disabled"
          onChange={(checked: boolean) => console.log('Switch:', checked)}
        />
      </div>
      <hr />
      <div className="block mt-6 mb-4">
        <input className="cursor-pointer" type="button" onClick={showModal} value="Show Modal" />
        <input className="cursor-pointer ml-5" type="button" onClick={showConfirmModal} value="Confirmation Modal" />
      </div>
      <hr />

      <div className="flex felx-row mt-6 mb-4">
        <Button label="Save" onClick={() => console.log('Save clicked')} />
        <Button label="Cancel" type={ButtonType.Cancel} className="ml-2" />
        <Button label="Disabled" type={ButtonType.Disabled} className="ml-2" />
        <Button label="INFO" type={ButtonType.Info} size={ButtonSize.SMALL} className="ml-2" />
        <Button label="Alert" type={ButtonType.Alert} className="ml-2" />
      </div>
      <hr />
      <div className="flex felx-row mt-6 mb-6">
        <Button
          label="Snackbar Top"
          onClick={showSnackbar}
          type={ButtonType.Primary}
        />

        <Button
          label="Snackbar Bottom"
          onClick={showSnackbarBottom}
          type={ButtonType.Info}
          className="ml-2"
        />
      </div>
      <hr />
      <div className="flex felx-row mt-6">
        {renderCheckBox()}
      </div>
      <hr />
      <div className="flex felx-row mt-6 mb-4">
        Empty
        <ImageViewer className="mr-6" />

        From URL
        {' '}
        <ImageViewer className="mr-6" width={120} src="https://chargelabservice.s3.us-east-2.amazonaws.com/stations/generic/Delta+AC+Mini.jpg" />

        Profile
        <ImageViewer width={40} className="mr-6" />
      </div>
      <hr />
    </>
  );
};
