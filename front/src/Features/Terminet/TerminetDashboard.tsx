import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStoreTerminet } from "../../app/stores/store";
import { TerminatForm } from "./TerminatForm";
import TerminetDetails from "./TerminetDetails";
import TerminetList from "./TerminetList";

export default  observer( function  PacientiDashboard(){
    const {TerminetStore}=useStoreTerminet();
    const{terminet,openForm}=TerminetStore;
  

    return(
        <Grid>
        <Grid.Column width={10}>
         

           
    
     <TerminetList />
   
            
        </Grid.Column>
        <Grid.Column width={6}>
        {TerminetStore.selectedTermini &&  !TerminetStore.editmode &&<TerminetDetails />}
            {TerminetStore.editmode &&<TerminatForm
            key={TerminetStore.selectedTermini && TerminetStore.selectedTermini.termini_ID|| 0}
            />}
         
        </Grid.Column>
    </Grid>
    )
}
);