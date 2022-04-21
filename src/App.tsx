import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import { get, getBearerToken, setApiPrefix } from './services/http/http.service';
import { AppHeader, AppSideBar, Label, Wiki } from './components/_ui';
import './App.scss';
import { Overview } from './components/overview';
import { Chargers } from './components/Charger';
import { getUserInfo, setBearerToken, setUserInfo } from './services/authenticate/authenticate.service';
import { Login } from './components/Login/Login.component';

function App() {
    useEffect(() => {
        (async () => {
            let dep = await get(`${(process.env.REACT_APP_ENV === 'dev' ? process.env.REACT_APP_ENDPOINT : '')}/deployment/cognito`)
                .catch((e) => e);

            if (process.env.REACT_APP_ENV === 'dev') {
                dep = {
                    region: process.env.REACT_APP_REGION,
                    userPoolId: process.env.REACT_APP_USER_POOL,
                    clientId: process.env.REACT_APP_CLIENTID,
                };
            }

            Amplify.configure({
                Auth: {
                    region: dep.region,
                    userPoolId: dep.userPoolId,
                    userPoolWebClientId: dep.clientId,
                    mandatorySignIn: false,
                    authenticationFlowType: 'CUSTOM_AUTH',
                },
            });

            if (document.location.href.indexOf('/login') === -1) {
                const user = await Auth.currentSession()
                   .catch(() => null);

                if (!user) {
                    document.location.href = '/login';
                } else {
                    setBearerToken(user.getAccessToken().getJwtToken());

                    const userInfo = await Auth.currentUserInfo();
                    setUserInfo(userInfo);

                    // will output {"apiUrlPrefix": "https://api-vXX-XXX.dev.chargelab.io"}
                    let apiPrefix = await get(`${(process.env.REACT_APP_ENV === 'dev' ? process.env.REACT_APP_ENDPOINT : '')}/deployment/api`);

                    if (process.env.REACT_APP_ENV === 'dev') {
                        apiPrefix = {
                            apiUrlPrefix: process.env.REACT_APP_EXTERNAL_API_URL,
                        };
                    }
                    setApiPrefix(apiPrefix.apiUrlPrefix);
                }
            }
        })();
    }, []);
  if (getBearerToken() === '') {
    return (
      <div className='flex h-screen bg-[#f5f6fa]'>
        <Login />
      </div>
    );
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
