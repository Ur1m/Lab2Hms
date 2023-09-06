import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStorePaisjet } from "../../app/stores/store";
import Listimi from "./Listimi";
import PaisjetDetails from "./PaisjetDetails";
import {  PaisjetForm } from "./PaisjetForm";
import PaisjetList from "./PaisjetList";

export default  observer( function  PaisjetDashboard(){
    const {PaisjetStore}=useStorePaisjet();
    const{paisjet,openForm,selectedPaisja,editmode}=PaisjetStore;
  

    return(
        
       
         

           
     <Listimi /> 
   
            
       
    
    )
}
);