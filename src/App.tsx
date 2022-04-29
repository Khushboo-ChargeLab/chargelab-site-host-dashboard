import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
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
  setBearerToken,
  setupCognito,
  setUserInfo,
} from './services/authenticate/authenticate.service';

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
  return (
    <div className='App'>
      <AppSideBar />
      <AppHeader />
      <div className='absolute left-60 right-0 top-20  pl-10 pr-10 pt-10 bottom-0 overflow-auto'>
        <Route exact path='/'>
          <Overview />
        </Route>
        <Route exact path='/chargers'>
          <Chargers />
        </Route>
        <Route exact path='/wiki'>
          <Wiki />
        </Route>

        <div className='fixed right-5 bottom-2'>
          <Link to='/wiki'>
            <Label text='wiki' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
