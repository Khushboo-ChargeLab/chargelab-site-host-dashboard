import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppHeader, AppSideBar, Label, Wiki } from './components/_ui';
import './App.scss';
import { Overview } from './components/overview';
import { fetchLocations } from './stores/reducers/location.reducer';

function App() {
  const distpach = useDispatch();

  useEffect(() => {
    distpach(fetchLocations());
  }, [distpach]);

  return (
    <div className='App'>
      <AppSideBar />
      <AppHeader />

      <div className='absolute left-60 right-0 top-20  pl-10 pr-10 pt-10 bottom-0 overflow-auto'>
        <Route exact path="/">
          <Overview />
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
