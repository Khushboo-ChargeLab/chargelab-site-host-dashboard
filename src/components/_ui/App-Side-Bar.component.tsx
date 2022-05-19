import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupBy } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  cooliconGrey4,
} from '../../lib';
import { getCurrentTheme } from '../../stores/selectors/theme.selector';
import { RoutePath, getBaseRoute, routes } from '../../routes';
import { getApiPrefix } from '../../services/http/http.service';

export const AppSideBar = () => {
  const theme = useSelector(getCurrentTheme);
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const handleMenuClick = (appMenu: any) => {
    navigate(appMenu.path || '/', { replace: true });
  };
  const { t } = useTranslation();

  const menu = [
    {
      items: [
        {
          selectedIcon: overviewSelected,
          header: '',
          path: RoutePath.OVERVIEW,
          icon: overview,
        },
      ],
    },
    {
      header: t('CHARGER MANAGEMENT'),
      items: [
        {
          selectedIcon: chargerSelected,
          path: RoutePath.CHARGERS,
          icon: chargers,
        },
        // { selectedIcon: pricingS, path: RoutePath.PRICING, icon: pricing },
        // { selectedIcon: accessS, path: RoutePath.ACCESS, icon: access },
      ],
    },
    // {
    //   header: t('ADMIN'),
    //   items: [
    //     { selectedIcon: company, path: RoutePath.COMPANY, icon: company },
    //     { selectedIcon: payout, path: RoutePath.PAYOUT, icon: payout },
    //     { selectedIcon: rfid, path: RoutePath.RFID, icon: rfid },
    //   ],
    // },
    // {
    //   header: t('RESOURCES'),
    //   items: [
    //     { selectedIcon: learning, path: RoutePath.LEARNING, icon: learning },
    //     { selectedIcon: help, path: RoutePath.HELP, icon: help },
    //   ],
    // },
  ];

  const renderLogo = () => (
    <img src={theme.networkLogo} alt='' className='pt-10 pr-3 pl-3 mb-10' />
  );

  const renderHeader = (text: string) => (
    <div className='block pl-3 mt-4' key={text}>
      <Label text={text} type={LabelType.LABEL_XS} />
    </div>
  );

  const renderItem = (item: any) => {
    const title = t(
      routes.find((route) => route.path === item.path)?.name || '',
    );
    const isSelected = getBaseRoute(currentLocation.pathname) === item.path;
    return (
      <div
        key={item.path}
        onClick={() => handleMenuClick(item)}
        className={`flex items-center w-50 pr-20 cursor-pointer rounded mt-2 ${
          isSelected ? 'bg-silver' : ''
        }`}
      >
        <img
          src={isSelected ? item.selectedIcon : item.icon}
          alt=''
          className='pt-2 pb-2 pl-4 pr-4'
        />
        <Label
          text={title}
          type={LabelType.LABEL_S_G6}
          className={
            isSelected
              ? 'whitespace-pre text-blue2'
              : 'whitespace-pre text-grey6'
          }
          style={isSelected ? { color: theme.navigationSelectedColor } : {}}
        />
      </div>
    );
  };

  const renderMenu = () =>
    menu.map((group) => {
      const divs = [];
      if (group.header) {
        divs.push(renderHeader(group.header));
      }
      group.items.forEach((item) => {
        divs.push(renderItem(item));
      });
      return divs;
    });

  const handleTempLinkClick = async (item: any) => {
    const api = await getApiPrefix();
    const url = api.oldDashboardUrl + item.path;
    window.open(url);
  };
  const renderTempLinks = () => {
    const data = [
      {
        name: 'Pricing',
        path: '/reports',
        icon: pricing,
      },
      {
        name: 'Payouts',
        path: '/stations',
        icon: payout,
      },
    ];
    return data.map((item: any) => (
      <div
        key={item.path}
        onClick={() => handleTempLinkClick(item)}
        className='flex items-center cursor-pointer rounded mt-2 justify-between'
      >
        <div className='flex flex-row items-center '>
          <img src={item.icon} alt='' className='pt-2 pb-2 pl-4 pr-4' />
          <Label
            text={item.name}
            type={LabelType.LABEL_S_G6}
            className='whitespace-pre text-grey6'
          />
        </div>

        <img
          src={cooliconGrey4}
          alt=''
          className='pt-2 pb-2 pl-4 pr-4 justify-end'
        />
      </div>
    ));
  };
  return (
    <div className='w-60 bg-white h-full block pl-5 pr-5 absolute'>
      {renderLogo()}
      {renderMenu()}
      {renderTempLinks()}
    </div>
  );
};
