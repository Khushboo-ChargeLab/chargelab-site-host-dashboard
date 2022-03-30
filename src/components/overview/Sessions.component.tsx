import { alert, charging } from '../../lib';
import {
 Card, Grid, Pill, PILL_BG_COLOR, Button, ButtonType, Label, LabelType,
} from '../_ui';
import { ButtonSize } from '../_ui/Button.component';
import { GridColumnType } from '../_ui/grid/enums/Grid-Column-Type.enum';

export const Sessions = () => (
  <Card title="Recent sessions">
    <div className="flex mt-3 mb-8 w-full">
      <div className="flex w-4/5">
        <Button size={ButtonSize.SMALL} label="Export " type={ButtonType.Cancel} />

      </div>
      <div className="flex justify-end w-1/5">
        <Button size={ButtonSize.SMALL} label="Export CSV" type={ButtonType.Cancel} />
      </div>
    </div>
    <Grid
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