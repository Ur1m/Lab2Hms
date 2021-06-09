import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ShtratList from './ShtratList';
import ShtratDetails from '../Details/ShtratDetails';


export default observer( function ShtratDashboard() {
    
    const {shtratStore} = useStore();
    const {selectedShtrat, editMode} = shtratStore;

    useEffect(() => {
      shtratStore.loadShtreter();
    }, [])
  
    if(shtratStore.loadingInitial) return <LoadingComponent content='Loading'/>


    return (
        <Grid>
            <Grid.Column width='10'>
                <ShtratList />
                <div>
                <Button onClick={() => shtratStore.openForm()} style = {{marginLeft:530, marginTop:5}} positive content='Shto Shtratin'/>
            </div>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedShtrat && !editMode &&
                <ShtratDetails/>}
                {editMode &&
                <ShtratDetails />}
            </Grid.Column>
        </Grid>
    )
})