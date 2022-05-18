import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './stores/store';
import './index.css';
import './services/translation/i18n';
import { Snackbar } from './components/_ui';
import { Login } from './components/Login/Login.component';
import { GlobalModal } from './components/_ui/modal/GlobalModal.component';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <GlobalModal>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GlobalModal>
      </React.StrictMode>
      <Snackbar />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
