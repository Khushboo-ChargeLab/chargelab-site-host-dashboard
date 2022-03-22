import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './stores/store';
import './index.css';
import './services/translation/i18n';
import { ModalForm, Snackbar } from './components/_ui';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </React.StrictMode>
    <ModalForm />
    <Snackbar />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
