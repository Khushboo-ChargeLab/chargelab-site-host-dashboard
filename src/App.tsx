import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, Outlet } from 'react-router-dom';
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
import { NoMatch } from './components/NoMatch/NoMath.component';
import { routes } from './routes';

function App() {
  const [loaded, setLoaded] = useState<boolean>(false);

  const distpach = useDispatch();

  useEffect(() => {
    (async () => {
      // When running locally, please update the .env file to point it to the stack you want
      // will output {"region": "us-east-1", "userPoolId": "us-east-1_S1aRqShe6", "clientId": "4ahk7m1g54kodg0e3c9qedv6vg"}
      // Upon logging in and your user does not exist in the user pool, kindly do the steps (note that the stack version should match what is in .env):
      // 1. ./path/to/chargelab-aws/scripts/add-user.sh [STACK VERSION] [E-MAIL] [PHONE NUMBER]
      // eg: ./add-user.sh 11-jer jerome.dogillo@chargelab.co +17807991234
      // 2. ./path/to/chargelab-aws/scripts/add-given-family-name.sh [STACK VERSION] [GIVEN NAME] [FAMILY NAME] [FILTER]
      // eg: ./add-given-family-name.sh 11-jer Jerome Dogillo 'email = "jerome.dogillo@chargelab.co"'
      // 3. Try logging in again
      await setupCognito();

      if (document.location.href.indexOf('/login') === -1) {
        const validToken = await refreshToken();

        if (!validToken) {
          document.location.href = '/login';
        } else {
          // when running locally, please update the .env file to point it to the stack you want
          // will output {"apiUrlPrefix": "https://api-vXX-XXX.dev.chargelab.io"}
          const apiPrefix = await httpRawGet('/deployment/api');

          setApiPrefix(apiPrefix.apiUrlPrefix);
          distpach(fetchLocations());
        }
      }
      setLoaded(true);
    })();
  }, [distpach]);

  if (!loaded || getBearerToken() === '') {
    return null;
  }

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
    // <div className='App'>
    //
    //   <AppHeader />
    //   <div className='absolute left-60 right-0 top-16  pl-10 pr-10 pt-10 bottom-0 overflow-auto'>
    //     <Routes>
    //       <Route path='/login' element={<Login />} />
    //       <Route path='/' element={} />
    //     </Routes>
    //     <Routes>
    //       <Route path='/' element={<Overview />} />
    //       <Route path='/chargers' element={<Chargers />} />
    //       <Route path='/wiki' element={<Wiki />} />
    //     </Routes>
    //   </div>
    // </div>
  );
}

export default App;
