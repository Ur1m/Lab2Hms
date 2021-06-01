import React, { useEffect, useState } from 'react';
import './styles.css';
import Navbar from '../../Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import DepartmentDashboard from '../../Features/Departmentet/Dashboard/DepartmentDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../Features/home/HomePage';

function App() {

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