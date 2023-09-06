import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStoreTerminet } from "../../app/stores/store";
import { TerminatForm } from "./TerminatForm";
import TerminatTable from "./TerminatTable";
import TerminetDetails from "./TerminetDetails";
import TerminetList from "./TerminetList";

export default  observer( function  PacientiDashboard(){
    const {TerminetStore}=useStoreTerminet();
    const{terminet,openForm,selectedTermini,editmode}=TerminetStore;
  

    return(
       
       
            <TerminetList/>
          
       

           
    
   
            
      
    )
}
);