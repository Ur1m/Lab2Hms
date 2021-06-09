import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import FaturaDetails from '../Details/FaturaDetails';
import FaturaForm from '../Form/FaturaForm';
import FaturaList from './FaturaList';


export default observer( function FaturaDashboard() {
    
    const {faturaStore} = useStore();
    const {selectedFatura, editMode} = faturaStore;

    useEffect(() => {
      faturaStore.loadFaturat();
    }, [])
  
    if(faturaStore.loadingInitial) return <LoadingComponent content='Loading'/>


    return (
        <Grid>
            <Grid.Column width='10'>
                <FaturaList />
                <div>
                <Button onClick={() => faturaStore.openForm()} style = {{marginLeft:530, marginTop:5}} positive content='Shto Faturen'/>
            </div>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedFatura && !editMode &&
                <FaturaDetails/>}
                {editMode &&
                <FaturaForm />}
            </Grid.Column>
        </Grid>
    )
})