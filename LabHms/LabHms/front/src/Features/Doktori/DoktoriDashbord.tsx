
import { observer } from 'mobx-react-lite';
import React from 'react';

import { Button, Grid} from 'semantic-ui-react';

import { useStoreDoktorat, useStorePacientat } from '../../app/stores/store';
import DoktoratList  from './DoktoratList';
import DoktoratDetails  from './DoktoriDetails'
import DoktoriForm from  './DoktoriForm';


//{Doktori,opencreateform,selectDoktori,selectedDoktori,editmode,seteditmode,setselectedDoktori,createDoktor,editDoktor,deleteDoktor}
export default observer( function DoktoriDashboard () {
  const {DoktoratStore}=useStoreDoktorat();
    const{selectedDoktori}=DoktoratStore;
 
  return (
    
          <React.Fragment>
      
            
      <DoktoratList  />
     
      </React.Fragment>
        
       )})
  
