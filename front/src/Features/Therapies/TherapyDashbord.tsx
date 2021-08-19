import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import { useStoreTherapies } from '../../app/stores/store';
import TerapiForm from './TerapiForm';
import TherapyDetails from './TherapyDetails';
import TherapyList from './TherapyList';



export default observer( function TherapyDashboard() {
    
    const {TherapyStore} = useStoreTherapies();
    const {selectedTherapy, editmode} = TherapyStore;

    useEffect(() => {
        TherapyStore.loadTerapit();
    }, [TherapyStore])
  
    


    return (
        <Grid>
            <Grid.Column width='10'>
                <TherapyList />
                <div>
                <Button onClick={() =>TherapyStore.openForm()} style = {{marginLeft:530, marginTop:5}} positive content='add'/>
            </div>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTherapy && !editmode &&
                <TherapyDetails/>}
                {editmode &&
                <TerapiForm/>}
            </Grid.Column>
        </Grid>
    )
})