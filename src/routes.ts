import React, { Component } from 'react';
import i18n from 'i18next';
import { Chargers } from './components/Charger';
import { Login } from './components/Login/Login.component';
import { Overview } from './components/overview';

export enum RoutePath {
  LOGIN = '/login',
  OVERVIEW = 'overview',
  CHARGERS = 'chargers',
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
    name: 'login',
    path: RoutePath.LOGIN,
    component: Login,
  },
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