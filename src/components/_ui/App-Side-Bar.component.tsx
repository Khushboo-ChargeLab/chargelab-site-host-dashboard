import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupBy } from 'lodash';
import { useHistory } from 'react-router-dom';
import { Label, LabelType } from '.';
import {
  chargelab,
  overviewSelected,
  chargers,
  pricing,
  access,
  company,
  payout,
  rfid,
  learning,
  help,
  chargerSelected,
  overview,
  pricingS,
  accessS,
} from '../../lib';
import { setCurrentNavigation } from '../../stores/reducers/app-navigation.reducer';
import { AppNavigator } from '../../stores/types/App-Navigator.interface';
import { getCurrentNavigation } from '../../stores/selectors/app-navigation.selector';
import { getCurrentTheme } from '../../stores/selectors/theme.selector';

const menu: AppNavigator[] = [
  {
    selectedIcon: overviewSelected,
    header: '',
    path: '/',
    title: 'Overview',
    icon: overview,
  },
  {
    selectedIcon: chargerSelected,
    header: 'CHARGER MANAGEMENT',
    path: '/chargers',
    title: 'Chargers',
    icon: chargers,
  },
  // { selectedIcon: pricingS, header: 'CHARGER MANAGEMENT', path: '/Pricing', title: 'Pricing', icon: pricing },
  // { selectedIcon: accessS, header: 'CHARGER MANAGEMENT', path: '/Access', title: 'Access', icon: access },
  // { selectedIcon: company, header: 'ADMIN', path: '/Company', title: 'Company', icon: company },
  // { selectedIcon: payout, header: 'ADMIN', path: '/Payout', title: 'Payout', icon: payout },
  // { selectedIcon: rfid, header: 'ADMIN', path: '/RFID', title: 'RFID cards', icon: rfid },
  // { selectedIcon: learning, header: 'RESOURCES', path: '/Learning', title: 'Learning', icon: learning },
  // { selectedIcon: help, header: 'RESOURCES', path: '/Help', title: 'Help', icon: help },
];

export const AppSideBar = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getCurrentTheme);
  const history = useHistory();
  const active = useSelector(getCurrentNavigation);

  const navigate = (appMenu: AppNavigator) => {
    dispatch(setCurrentNavigation(appMenu));
    history.push(appMenu.path || '/');
  };

  return (
    <div className='w-60 bg-white h-full block pl-5 pr-5 absolute'>
      <img src={theme.networkLogo} alt='' className='pt-10 pr-3 pl-3 mb-10' />
      {Object.keys(groupBy(menu, 'header')).map((key: any, index: number) =>
        index === 0 ? (
          <div
            key={`menu-item-${key}`}
            onClick={() => navigate(menu[0])}
            className={`flex items-center w-50 pr-20 cursor-pointer rounded mb-4 ${
              active.path === menu[0].path ? 'bg-silver' : ''
            }`}
          >
            <img
              src={active.path === menu[0].path ? overviewSelected : overview}
              alt=''
              className='pt-2 pb-2 pl-3 pr-4'
            />
            <Label
              text='Overview'
              type={LabelType.LABEL_S}
              className={
                active.path === menu[0].path ? 'text-blue2' : 'text-grey6'
              }
              style={
                active.path === menu[0].path
                  ? { color: theme.navigationSelectedColor }
                  : {}
              }
            />
          </div>
        ) : (
          <React.Fragment key={`item-row-${key}`}>
            <div className='block pl-3 mt-4' key={`sub-menu-item-${key}`}>
              <Label text={key} type={LabelType.LABEL_XS} />
            </div>
            {menu
              .filter((m) => m.header === key)
              .map((item) => (
                <div
                  key={`sub-action-menu-${item.title}`}
                  onClick={() => navigate(item)}
                  className={`flex items-center w-50 pr-20 cursor-pointer rounded mt-2 ${
                    active.path === item.path ? 'bg-silver' : ''
                  }`}
                >
                  <img
                    src={
                      active.path === item.path ? item.selectedIcon : item.icon
                    }
                    alt=''
                    className='pt-2 pb-2 pl-4 pr-4'
                  />
                  <Label
                    text={item.title}
                    type={LabelType.LABEL_S_G6}
                    className={
                      active.path === item.path
                        ? 'whitespace-pre text-blue2'
                        : 'whitespace-pre text-grey6'
                    }
                    style={
                      active.path === item.path
                        ? { color: theme.navigationSelectedColor }
                        : {}
                    }
                  />
                </div>
              ))}
          </React.Fragment>
        ),
      )}
    </div>
  );
};
