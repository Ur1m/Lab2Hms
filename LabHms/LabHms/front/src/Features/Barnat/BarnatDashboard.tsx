import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStoreBarnat } from "../../app/stores/store";
import BarnatDesign from "./BarnatDesign";

import BarnatDetails from "./BarnatDetails";
import { BarnatForm } from "./BarnatForm";
import BarnatList from "./BarnatList";

export default  observer( function  PaisjetDashboard(){
    const {BarnatStore}=useStoreBarnat();
    const{Barnat,openForm}=BarnatStore;
  

    return(
        
         
     <React.Fragment>
           
     <BarnatDesign  /> 
     
   
     </React.Fragment>
      
    )
}
);