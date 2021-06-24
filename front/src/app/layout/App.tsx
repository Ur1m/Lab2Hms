import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import Navbar from '../../Components/Navbar';
import { BrowserRouter as Router, Switch, Route, RouteComponentProps,withRouter, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import '../../app/layout/styles.css';
import DoktoriDashboard  from '../../Features/Doktori/DoktoriDashbord';
import { observer } from 'mobx-react-lite';


import agent from '../api/agent';


import DepartmentDashboard from '../../Features/Departmentet/Dashboard/DepartmentDashboard';
import HomePage from '../../Features/home/HomePage';
import { ILaboratori } from '../models/ILaboratori';
import axios from 'axios';
import LaboratoriDashboard from '../../Features/Laboratoret/Dashboard/LaboratoriDashboard';
import TestErrors from '../../Features/errors/TestError';
import { Slide, ToastContainer } from 'react-toastify';
import NotFound from '../../Features/errors/NotFound';
import ServerError from '../../Features/errors/ServerError';
import PacientiDashboard from '../../Features/Pacineti/PacinetiDashboard'
import FaturaDashboard from '../../Features/Faturat/Dashboard/FaturaDashboard';
import TerminetDashboard from '../../Features/Terminet/TerminetDashboard';
import TerminetList from '../../Features/Terminet/TerminetList';
import ShtratDashboard from '../../Features/Shtreter/Dashboard/ShtratDashboard';
import LlojiShtratitDashboard from '../../Features/llojiShtratit/Dashboard/LlojiShtratitDashboard';
import CaktoShtratinDashboard from '../../Features/caktoShtratin/Dashboard/CaktoShtratinDashboard';
import PaisjetDashbord from '../../Features/Paisjet/PaisjetDashbord';
import InfermierjaDashboard from '../../Features/Infermieret/Dashboard/InfermierjaDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import DhomaDashboard from '../../Features/Dhomat/Dashboard/DhomaDashboard';
import LoginForm from '../../Features/users/LoginForm';



// const[blooddonors, setBloodDonors]=useState([]);

// greta

const App = () => {

  const[laboratoret, setLaboratoret]=useState<ILaboratori[]>([]);
  const [selectedLaboratori, setSelectedLaboratori]= useState<ILaboratori|null>(
    null);
  const [editMode, setEditMode]=useState(false);

  const handleSelectLaboratori= (id: string) => {
    setSelectedLaboratori(laboratoret.filter(a=>a.id ===id)[0]);
    setEditMode(false);

  };
  
  const handleOpenCreateForm=() => {
    setSelectedLaboratori(null);
    setEditMode(true);
  }

  const handleCreateLaboratori=(laboratori:ILaboratori) => {
    setLaboratoret([...laboratoret, laboratori])
    setSelectedLaboratori(laboratori);
    setEditMode(false);
  }

  const handleEditLaboratori = (laboratori:ILaboratori)=> {
    setLaboratoret([...laboratoret.filter(a=>a.id !== laboratori.id), laboratori])
    setSelectedLaboratori(laboratori);
    setEditMode(false);
  }

  const handleDeleteLaboratori=(id: string)=>{
    setLaboratoret([...laboratoret.filter(a=>a.id!==id)])
  }

  useEffect(() => {
    axios
    .get<ILaboratori[]>('http://localhost:5000/api/laboratoret')
    .then(response=>{
      let laboratoret: ILaboratori[]=[];
      response.data.forEach(laboratori => {
        laboratori.date=laboratori.date.split('.')[0];
        laboratoret.push(laboratori);
      })
      setLaboratoret(laboratoret);
      });
  }, []);
 
 

 



// useEffect(()=>{
//   axios.get('http://localhost:5000/api/blooddonors').then(response =>{
//     console.log(response);
//     setBloodDonors(response.data);
//   })
// },[])

  const location=useLocation();


return (
  <Fragment>
  <ToastContainer position='bottom-right' />
  <Route exact path='/' component={HomePage} />
  <Route
    path={'/(.+)'}
    render={() => (
      <Fragment>
   
      <ToastContainer position='bottom-right' hideProgressBar />
      
      <Navbar  openCreateForm={handleOpenCreateForm}/>
        
        <Switch>
        <Container style={{marginTop: '8em'}}>
        {/* <LaboratoriDashboard laboratoret={laboratoret}
          selectLaboratori={handleSelectLaboratori}
          selectedLaboratori={selectedLaboratori}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedLaboratori={setSelectedLaboratori}
          createLaboratori={handleCreateLaboratori}
          editLaboratori={handleEditLaboratori}
          deleteLaboratori={handleDeleteLaboratori} /> */}
          <Switch>
          <Route path='/Departamentet' component={DepartmentDashboard}/>
          <Route path='/Infermieret' component={InfermierjaDashboard}/>
          <Route path={'/Doktorat'} component={DoktoriDashboard}/>
          <Route path={'/Pacientat'} component={PacientiDashboard}/>
          <Route path={'/Faturat'} component={FaturaDashboard}/>
          <Route path={'/Laboratoret'} component={LaboratoriDashboard}/>
          <Route path={'/Shtreter'} component={ShtratDashboard} />
          <Route path={'/Paisjet'} component={PaisjetDashbord}/>
          <Route path={'/llojiShtratit'} component={LlojiShtratitDashboard} />
          <Route path={'/caktoShtreterit'} component={CaktoShtratinDashboard} />
          <Route path={'/Dhomat'} component={DhomaDashboard} />
          <Route path='/errors' component={TestErrors} /> 
          <Route exact path={'/Terminet'} component={TerminetDashboard}/>
          <Route  path='/Terminet/:id' component={TerminetList}/>
          <Route path='/server-error' component={ServerError} />
          <Route path='/login' component={LoginForm} />
          <Route component={NotFound}/>
          </Switch>
        </Container>
        </Switch>
        </Fragment>
        )}
      />
    </Fragment>
  );
};

export default observer (App);
