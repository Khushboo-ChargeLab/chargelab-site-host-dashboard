import React, { Component } from 'react';
import i18n from 'i18next';
import { Chargers } from './components/Charger';
import { Overview } from './components/overview';
import { ChargerDetail } from './components/Charger/ChargerDetail.component';

export enum RoutePath {
  LOGIN = '/login',
  OVERVIEW = 'overview',
  CHARGERS = 'chargers',
  CHARGER_DETAIL = 'chargers/:chargerId',
  PRICING = 'pricing',
  ACCESS = 'access',
  COMPANY = 'company',
  PAYOUT = 'payout',
  RFID = 'rfid',
  LEARNING = 'learing',
  HELP = 'help',
}

export interface Route {
  name:string;
  path: RoutePath;
  component: React.ComponentType;
}

export const routes: Route[] = [
  {
    name: 'overview',
    path: RoutePath.OVERVIEW,
    component: Overview,
  },
  {
    name: 'chargers',
    path: RoutePath.CHARGERS,
    component: Chargers,
  },
  {
    name: 'charger_detail',
    path: RoutePath.CHARGER_DETAIL,
    component: ChargerDetail,
  },
  // {
  //   name:
  //   path: RoutePath.PRICING,
  //   component: ,
  // },
  // {
  //   name:
  //   path: RoutePath.ACCESS,
  //   component: ,
  // },
  // {
  //   name:
  //   path: RoutePath.COMPANY,
  //   component: ,
  // },
  // {
  //   name:
  //   path: RoutePath.PAYOUT,
  //   component: ,
  // },
  // {
  //   name:
  //   path: RoutePath.LEARNING,
  //   component: ,
  // },
  // {
  //   name:
  //   path: RoutePath.RFID,
  //   component: ,
  // },
  // {
  //   name:
  //   path: RoutePath.HELP,
  //   component: ,
  // },
];

export const getBaseRoute = (fullPath:string) => {
  const arr = fullPath.split('/');
  return arr?.length >= 2 ? arr[1] : arr[0];
};

export const getRouteTitle = (fullpath:string) => {
  const baseRoute = getBaseRoute(fullpath);

  return routes.find((route) => route.path === baseRoute)?.name || '';
};