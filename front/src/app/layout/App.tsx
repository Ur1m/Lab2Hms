import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import Navbar from '../../Components/Navbar';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import DepartmentDashboard from '../../Features/Departmentet/Dashboard/DepartmentDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../Features/home/HomePage';
import axios from 'axios';

import NavBar from '../../Components/Navbar';


import InfermierjaDashboard from '../../Features/Infermieret/Dashboard/InfermierjaDashboard';

import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import InfermierjaForm from '../../Features/Infermieret/form/InfermierjaForm';
import InfermierjaDetails from '../../Features/Infermieret/details/InfermierjaDetails';

function App() {
/*
const[blooddonors, setBloodDonors]=useState([]);

useEffect(()=>{
  axios.get('http://localhost:5000/api/blooddonors').then(response =>{
    console.log(response);
    setBloodDonors(response.data);
  })
},[])
*/
  const location=useLocation();
  return (
   <>
      <Router>
        <Navbar/>
        <Switch>
        <Container style={{marginTop: '4em'}}>
          <Route exact path='/' component={HomePage}/>
          <Route path='/Departamentet' component={DepartmentDashboard}/>

          <Route exact path='/infermieret' component={InfermierjaDashboard}/>
          <Route path='/infermieret/:Infermierja_Id' component={InfermierjaDetails}/>
          <Route key={location.key} path={['/createInfermierja','/manage/:Infermierja_Id']} component={InfermierjaForm}/>

        </Container>
        </Switch>
      </Router>
      
    </>
    
  );
}

export default observer (App);