
import '../../app/layout/styles.css';
import {DoktoriDashboard}  from '../../Features/Doktori/DoktoriDashbord';
import doktoretStor from '../store/doktoretStor';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router,Switch, Route, RouteComponentProps,withRouter } from 'react-router-dom';
import{ DoktoriForm} from '../../Features/Doktori/DoktoriForm';
import {DoktoratDetails} from '../../Features/Doktori/DoktoriDetails';
import {DoktoratList }from '../../Features/Doktori/DoktoratList';
import { IDoktori } from '../Models/Doktori';
import agent from '../api/agent';

import React, { useEffect, useState } from 'react';
import './styles.css';

import DepartmentDashboard from '../../Features/Departmentet/Dashboard/DepartmentDashboard';
import HomePage from '../../Features/home/HomePage';
import TestErrors from '../../Features/errors/TestError';
import { Slide, ToastContainer } from 'react-toastify';
import NotFound from '../../Features/errors/NotFound';
import ServerError from '../../Features/errors/ServerError';
import Navbar from '../../Components/Navbar';

const App=()=> {
 
 

 



/*const [infermieret, setInfermieret] = useState([]);
useEffect(() =>{
  axios.get('http://localhost:5000/api/infermieret').then(response =>{
    console.log(response);
    setInfermieret(response.data);
  })
}, [])
 return (
    < div>
    <header as ='h2' icon ='users' content='Infermieret'/>
    <List>
        {infermieret.map((infermierja: any) =>{
          <List.item key=(infermierja.id)</li>
          {infermierja.emri}
          </List.item>
        })}
    </List>
    </div>
*/
  return (
   <>
   
      <ToastContainer position='bottom-right' hideProgressBar />
      <Router>
        <Navbar/>
        <Switch>
        <Container style={{marginTop: '4em'}}>
          <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/Departamentet' component={DepartmentDashboard}/>
          <Route path={'/Doktorat'} component={DoktoriDashboard}/>
          <Route path='/errors' component={TestErrors} /> 
          <Route path='/server-error' component={ServerError} />
          <Route component={NotFound}/>
          </Switch>
        </Container>
        </Switch>
      </Router>
      
    </>
    
  );
}


//export default withRouter(observer(App));

export default observer (App);

