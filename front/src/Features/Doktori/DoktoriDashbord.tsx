
import { observer } from 'mobx-react-lite';

import { Button, Grid} from 'semantic-ui-react';

import { useStoreDoktorat, useStorePacientat } from '../../app/stores/store';
import DoktoratList  from './DoktoratList';
import DoktoratDetails  from './DoktoriDetails'
import {DoktoriForm} from  './DoktoriForm';


//{Doktori,opencreateform,selectDoktori,selectedDoktori,editmode,seteditmode,setselectedDoktori,createDoktor,editDoktor,deleteDoktor}
export default observer( function DoktoriDashboard () {
  const {DoktoratStore}=useStoreDoktorat();
    const{selectedDoktori}=DoktoratStore;
 
  return (
     <Grid>
         <Grid.Column width={10}>
          

            
      <DoktoratList  />
     
             
         </Grid.Column>
         <Grid.Column width={6}>
            { selectedDoktori! &&  !DoktoratStore.editmode &&<DoktoratDetails />}
             {DoktoratStore.editmode &&<DoktoriForm 
             key={selectedDoktori! && selectedDoktori.mjeku_Id || 0} 
            />}
         </Grid.Column>
     </Grid>
       )})
  
