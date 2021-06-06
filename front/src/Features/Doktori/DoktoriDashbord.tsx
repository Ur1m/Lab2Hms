import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Grid} from 'semantic-ui-react';
import agent from '../../app/api/agent';
import { IDoktori } from '../../app/models/Doktori';

import doktoretStor from '../../app/store/doktoretStor';
import {DoktoratList} from './DoktoratList';
import {DoktoratDetails} from './DoktoriDetails'
import {DoktoriForm} from './DoktoriForm'

interface IProps{
  Doktori: IDoktori[];
  selectDoktori:(Id: string) => void;
  selectedDoktori:IDoktori;
  editmode:boolean;
  seteditmode:(editmode:boolean)=>void;
  setselectedDoktori:(doktori:IDoktori |null)=>void;
  createDoktor:(doktori:IDoktori)=>void;
  editDoktor:(doktori:IDoktori)=>void;
  deleteDoktor:(id:string)=>void;
  opencreateform:()=>void;

  
  
}
//{Doktori,opencreateform,selectDoktori,selectedDoktori,editmode,seteditmode,setselectedDoktori,createDoktor,editDoktor,deleteDoktor}
export const DoktoriDashboard : React.FC = () => {
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
  
 
  return (
     <Grid>
         <Grid.Column width={10}>

            
      <DoktoratList Doktori={Doktori} selectDoktori={handleSelectedDoktori} deleteDoktor={handledeleteDoktori} />
      <Button onClick={hendleopencreateform}floated="right"   content='AddDoktorat'/>
             
         </Grid.Column>
         <Grid.Column width={6}>
            {selectedDoktori &&  !editmode &&<DoktoratDetails selectedDoktori={selectedDoktori} seteditmode={seteditmode} setselectedDoktori={setselectedDoktori} />}
             {editmode &&<DoktoriForm 
             key={selectedDoktori && selectedDoktori.mjeku_Id || 0} selectedDoktori={selectedDoktori!} seteditmode={seteditmode}
             createDoktor={handlecreateDoktor}
             editDoktor={handleeditDoktori}/>}
         </Grid.Column>
     </Grid>
       )}
  
