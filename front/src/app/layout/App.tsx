<<<<<<< HEAD
import  {  useContext, useEffect, useState} from 'react'; 
import Navbar from '../../Features/Nav/Navbar';
import '../../app/layout/styles.css';

import {DoktoriDashboard}  from '../../Features/Doktori/DoktoriDashbord';
import doktoretStor from '../store/doktoretStor';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import { Route, RouteComponentProps,withRouter } from 'react-router-dom';
import{ DoktoriForm} from '../../Features/Doktori/DoktoriForm';
import {DoktoratDetails} from '../../Features/Doktori/DoktoriDetails';
import {DoktoratList }from '../../Features/Doktori/DoktoratList';
import { IDoktori } from '../models/Doktori';
import agent from '../api/agent';
import { NONAME } from 'dns';

const App:React.FC<RouteComponentProps> =({location})=> {
  const [Doktori,setDoktori]=useState<IDoktori[]>([]);
  const [selectedDoktori,setselectedDoktori]=useState<IDoktori | null>(null);
  const [editmode,seteditmode]=useState(false);
  const hendleopencreateform = () =>{
    setselectedDoktori(null);
    seteditmode(true);

  }
  const handlecreateDoktor=(Doktorii:IDoktori)=>{
    agent.doktoret.create(Doktorii).then(()=>{
      setDoktori([...Doktori,Doktorii]);
    setselectedDoktori(Doktorii);
    seteditmode(false);
    })
    

  }
  const handleeditDoktori=(Doktorii:IDoktori)=>{
    agent.doktoret.update(Doktorii).then(()=>{
      setDoktori([...Doktori.filter(a=>a.mjeku_Id !== Doktorii.mjeku_Id),Doktorii]);
    setselectedDoktori(Doktorii);
    seteditmode(false);
    })
   
  }
  const handledeleteDoktori=(id:string)=>{
    agent.doktoret.delete(id).then(()=>{
      setDoktori([...Doktori.filter(a=> a.mjeku_Id !==id)])
    })
    
  }


  const handleSelectedDoktori = (Id: string) => {
    setselectedDoktori(Doktori.filter(a => a.mjeku_Id === Id)[0]);
    seteditmode(false);
  }
  useEffect(() => {
    agent.doktoret.list().then(respanse =>{
      let Doktori:IDoktori[]=[];
      respanse.forEach(ac=>{
        ac.ditlindja=ac.ditlindja.split('.')[0];
        Doktori.push(ac)
      })
     setDoktori(Doktori);
  });
},[]);
  /* Doktori={Doktori} selectDoktori={handleSelectedDoktori} opencreateform={hendleopencreateform} selectedDoktori={selectedDoktori!} 
     editmode={editmode} seteditmode={seteditmode} setselectedDoktori={setselectedDoktori}
     createDoktor={handlecreateDoktor}
     editDoktor={handleeditDoktori}
     deleteDoktor={handledeleteDoktori}*/
 

  return ( 
    <div>
   <Navbar  opencreateform={hendleopencreateform}/>
   <Container style={{marginTop:'50px'}}>
    <Route path={'/Doktorat'} component={DoktoriDashboard}/>
   </Container>
   
=======
import React, { useEffect, useState } from 'react';
import './styles.css';
import Navbar from '../../Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import DepartmentDashboard from '../../Features/Departmentet/Dashboard/DepartmentDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../Features/home/HomePage';
import TestErrors from '../../Features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../Features/errors/NotFound';
import ServerError from '../../Features/errors/ServerError';

function App() {
>>>>>>> ed6c089d2b03aa2626588a28c839ca8f6ae218f8

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

<<<<<<< HEAD
export default withRouter(observer(App));
=======
export default observer (App);
>>>>>>> ed6c089d2b03aa2626588a28c839ca8f6ae218f8
