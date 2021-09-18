import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Router}from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import "react-widgets/styles.css";
import App from './app/layout/App';
import {createBrowserHistory} from 'history';
import { store, StoreContext, StorePacientat,StoreContextPacientat, StoreDoktorat,StoreContextDoktorat, StoreContextTerminet, StoreTerminet, StoreTherapies, StoreContextTherapies, StoreContextRaport, StoreRaport, StoreLaboratoret, StoreContextLaboratori, StoreContextShtrat, StoreShtrat } from './app/stores/store';
import reportWebVitals from './reportWebVitals';
import dateFnsLocalizer from 'react-widgets-date-fns';
 new dateFnsLocalizer();


export const history = createBrowserHistory();


ReactDOM.render(
  <StoreContext.Provider value={store}>
    <StoreContextPacientat.Provider value={StorePacientat}/>
    <StoreContextPacientat.Provider value={StorePacientat}/>
    <StoreContextDoktorat.Provider value={StoreDoktorat}/>
    <StoreContextTerminet.Provider value={StoreTerminet}/>
    <StoreContextTherapies.Provider value={StoreTherapies}/>
    <StoreContextLaboratori.Provider value={StoreLaboratoret}/>
    <StoreContextRaport.Provider value={StoreRaport}/>
    <StoreContextShtrat.Provider value={StoreShtrat}/>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>
  ,
// ed6c089d2b03aa2626588a28c839ca8f6ae218f8
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
