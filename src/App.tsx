import React from 'react';
import { Link, Route } from 'react-router-dom';
import { AppHeader, AppSideBar, Label, Wiki } from './components/_ui';
import './App.scss';
import { Overview } from './components/overview';

function App() {
  return (
    <div className='App'>
      <AppSideBar />
      <AppHeader />

      <div className='absolute left-60 right-0 top-20  pl-10 pr-10 pt-10 bottom-0 overflow-auto'>
        <Route path='/wiki'>
          <Wiki />
        </Route>
        <Route path="/">
          <Overview />
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
