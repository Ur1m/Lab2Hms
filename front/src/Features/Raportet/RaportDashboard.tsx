import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import { useStoreRaport, useStoreTherapies } from '../../app/stores/store';
import RaportForm from './RaportForm';
import RaportDetails from './RaportDetails';
import RaportList from './RaportList';



export default observer( function TherapyDashboard() {
    
    const {RaportStore} = useStoreRaport();
    const {selectedRaport, editmode} = RaportStore;

    useEffect(() => {
        RaportStore.loadRaportet();
    }, [RaportStore])
  
    


    return (
        
        <Grid>
            <Grid.Column width='10'>
                
                <RaportList />
                
                <div>
                <Button onClick={() =>RaportStore.openForm()} style = {{marginLeft:530, marginTop:5}} positive content='add'/>
            </div>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedRaport && !editmode &&
                <RaportDetails/>}
                {editmode &&
                <RaportForm/>}
            </Grid.Column>
            
            
        </Grid>
        
    )
})