import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStoreBarnat } from "../../app/stores/store";

import BarnatDetails from "./BarnatDetails";
import { BarnatForm } from "./BarnatForm";
import BarnatList from "./BarnatList";

export default  observer( function  PaisjetDashboard(){
    const {BarnatStore}=useStoreBarnat();
    const{Barnat,openForm}=BarnatStore;
  

    return(
        <Grid>
        <Grid.Column width={10}>
         

           
     <BarnatList  /> 
   
            
        </Grid.Column>
        <Grid.Column width={6}>
           {BarnatStore.selectedBarna &&  !BarnatStore.editmode &&<BarnatDetails />}
            {BarnatStore.editmode &&<BarnatForm
            key={BarnatStore.selectedBarna  && BarnatStore.selectedBarna .barnat_Id|| 0}
            />}
        </Grid.Column>
    </Grid>
    )
}
);