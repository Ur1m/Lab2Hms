import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStorePaisjet } from "../../app/stores/store";
import PaisjetDetails from "./PaisjetDetails";
import { PaisjetForm } from "./PaisjetForm";
import PaisjetList from "./PaisjetList";

export default  observer( function  PaisjetDashboard(){
    const {PaisjetStore}=useStorePaisjet();
    const{paisjet,openForm}=PaisjetStore;
  

    return(
        <Grid>
        <Grid.Column width={10}>
         

           
     <PaisjetList  /> 
   
            
        </Grid.Column>
        <Grid.Column width={6}>
           {PaisjetStore.selectedPaisja &&  !PaisjetStore.editmode &&<PaisjetDetails />}
            {PaisjetStore.editmode &&<PaisjetForm 
            key={PaisjetStore.selectedPaisja && PaisjetStore.selectedPaisja.paisja_Id|| 0}
            />}
        </Grid.Column>
    </Grid>
    )
}
);