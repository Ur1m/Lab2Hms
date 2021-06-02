import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import {BrowserRouter}from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import "react-widgets/styles.css";
import App from './app/layout/App';
//import dateFnsLocalizer from  'react-widgets-date-fns';

//dateFnsLocalizer();

import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
=======
import { Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css';
import App from './app/layout/App';
import { store, StoreContext } from './app/stores/store';
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>,
>>>>>>> ed6c089d2b03aa2626588a28c839ca8f6ae218f8
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
