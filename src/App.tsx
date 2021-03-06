import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getBearerToken,
  httpRawGet,
  setApiPrefix,
} from './services/http/http.service';
import { AppHeader, AppSideBar, Label, Wiki } from './components/_ui';
import './App.scss';
import { Overview } from './components/overview';
import { fetchLocations } from './stores/reducers/location.reducer';
import { Chargers } from './components/Charger';
import {
  refreshToken,
  setupCognito,
} from './services/authenticate/authenticate.service';
import { NoMatch } from './components/NoMatch/NoMatch.component';
import { RoutePath, routes } from './routes';
import { Login } from './components/Login/Login.component';
import { setCurrentTheme } from './stores/reducers/theme.reducer';

function App() {
  // const [loaded, setLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const distpach = useDispatch();
  const currentLocation = useLocation();

  useEffect(() => {
    (async () => {
      const { hostname } = window.location;
      /*
      {
        "companyName":"ChargeLab",
        "address":null,
        "fromEmailName":"No Reply",
        "fromEmailAddress":"noreply@dev.chargelab.io",
        "supportEmailAddress":"support@chargelab.co"
      }
      */
      const receiptSettingResponse = await httpRawGet(`/assets?resourceId=receipt-settings&domainName=${hostname}`).catch((e) => e);
      // favicon will be determined based on the domain
      (document.getElementById('favicon') as any).href = `/assets?resourceId=favicon&domainName=${hostname}`;
      if (receiptSettingResponse) {
        // tab title will be determined based on the domain
        document.title = receiptSettingResponse.companyName;
      }
      /*
      {
        "primary_color": "#18A0D7",
        "secondary_color": "#E3F4FA"
      }
      */
      const themeResponse = await httpRawGet(`/assets?resourceId=theme&domainName=${hostname}`).catch((e) => e);
      distpach(setCurrentTheme({
        // logo will be determined based on the domain
        networkLogo: `/assets?resourceId=logo-svg&domainName=${hostname}`,
        chartColor: '#18A0D7',
        navigationSelectedColor: '#18A0D7',
        btnHoverColor: '#117DB8',
        secondaryBtnBgColor: '#E8F7FC',
        // TODO we don't have hover color yet, probably just calculate the lighter shade of the primary color??
        // TODO we also don't have the capability to change the SVG icon colors dynamically for the navigation icons
        // chartColor: themeResponse.primary_color,
        // navigationSelectedColor: themeResponse.primary_color,
        // btnHoverColor: themeResponse.primary_color,
        // secondaryBtnBgColor: themeResponse.secondary_color,
      }));
      // When running locally, please update the .env file to point it to the stack you want
      // will output {"region": "us-east-1", "userPoolId": "us-east-1_S1aRqShe6", "clientId": "4ahk7m1g54kodg0e3c9qedv6vg"}
      // Upon logging in and your user does not exist in the user pool, kindly do the steps (note that the stack version should match what is in .env):
      // 1. ./path/to/chargelab-aws/scripts/add-user.sh [STACK VERSION] [E-MAIL] [PHONE NUMBER]
      // eg: ./add-user.sh 11-jer jerome.dogillo@chargelab.co +17807991234
      // 2. ./path/to/chargelab-aws/scripts/add-given-family-name.sh [STACK VERSION] [GIVEN NAME] [FAMILY NAME] [FILTER]
      // eg: ./add-given-family-name.sh 11-jer Jerome Dogillo 'email = "jerome.dogillo@chargelab.co"'
      // 3. Try logging in again
      await setupCognito();
      if (currentLocation.pathname !== RoutePath.LOGIN) {
        const validToken = await refreshToken();
        if (!validToken) {
          navigate(RoutePath.LOGIN, { replace: true });
        } else {
          // when running locally, please update the .env file to point it to the stack you want
          /*
          {
            "apiUrlPrefix": "https://api-vXX-XXX.dev.chargelab.io",
            "oldDashboardUrl": "https://"
          }
          */
          const apiPrefix = await httpRawGet(`/deployment/api?hostname=${hostname}`);
          setApiPrefix(apiPrefix);
          distpach(fetchLocations());
          if (currentLocation.pathname === '/') {
            navigate(RoutePath.OVERVIEW, { replace: true });
          }
        }
      }
      // setLoaded(true);
    })();
  }, [distpach]);

  const Layout = () => {
    return (
      <div>
        <AppSideBar />
        <AppHeader />
        <div className='absolute left-60 right-0 top-16  pl-10 pr-10 pt-10 bottom-0 overflow-auto bg-dashboard'>
          <Outlet />
        </div>
      </div>
    );
  };

  return (
    <Routes>
      <Route index element={<div />} />
      <Route path='/login' element={<Login />} />
      <Route path='/wiki' element={<Wiki />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<Overview />} />
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Route>
      <Route path='*' element={<NoMatch />} />
    </Routes>
  );
}

export default App;
