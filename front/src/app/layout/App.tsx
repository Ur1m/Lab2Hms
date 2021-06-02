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
   

   </div>
  );
}

export default withRouter(observer(App));
