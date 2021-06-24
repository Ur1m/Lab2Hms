import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DhomaDetails from '../Details/DhomaDetails';
import DhomaForm from '../Form/DhomaForm';
import DhomaList from './DhomaList';


export default observer( function DhomaDashboard() {
    
    const {dhomaStore} = useStore();
    const {selectedDhoma, editMode} = dhomaStore;

    useEffect(() => {
      dhomaStore.loadDhomat();
    }, [])
  
    if(dhomaStore.loadingInitial) return <LoadingComponent content='Loading'/>


    return (
        <Grid>
            <Grid.Column width='10'>
                <DhomaList />
                <div>
                <Button onClick={() => dhomaStore.openForm()} style = {{marginLeft:530, marginTop:5}} positive content='Shto Dhome'/>
            </div>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedDhoma && !editMode &&
                <DhomaDetails/>}
                {editMode &&
                <DhomaForm />}
            </Grid.Column>
        </Grid>
    )
})