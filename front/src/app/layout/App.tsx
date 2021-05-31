import React from 'react';
import './styles.css';
import Navbar from '../../Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import DepartmentDashboard from '../../Features/Departmentet/Dashboard/DepartmentDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../Features/home/HomePage';

function App() {
  return (
   <>
      <Router>
        <Navbar/>
        <Switch>
        <Container style={{marginTop: '4em'}}>
          <Route exact path='/' component={HomePage}/>
          <Route path='/Departamentet' component={DepartmentDashboard}/>
        </Container>
        </Switch>
      </Router>
      
    </>
    
  );
}

export default observer (App);