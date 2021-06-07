import React, { useEffect, useState } from 'react';
import './styles.css';
import Navbar from '../../Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import DepartmentDashboard from '../../Features/Departmentet/Dashboard/DepartmentDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../Features/home/HomePage';
import { ILaboratori } from '../Models/ILaboratori';
import axios from 'axios';
import LaboratoriDashboard from '../../Features/Laboratoret/Dashboard/LaboratoriDashboard';

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

//greta

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
        <Navbar openCreateForm={handleOpenCreateForm}/>
        <Switch>
        <Container style={{marginTop: '4em'}}>
        <LaboratoriDashboard laboratoret={laboratoret}
         selectLaboratori={handleSelectLaboratori}
         selectedLaboratori={selectedLaboratori}
         editMode={editMode}
         setEditMode={setEditMode}
         setSelectedLaboratori={setSelectedLaboratori}
         createLaboratori={handleCreateLaboratori}
         editLaboratori={handleEditLaboratori}
         deleteLaboratori={handleDeleteLaboratori}
         />
          <Route exact path='/' component={HomePage}/>
          <Route path='/Departamentet' component={DepartmentDashboard}/>
        </Container>
        </Switch>
      </Router>
      
    </>
    
  );
  };
  export default observer (App);
