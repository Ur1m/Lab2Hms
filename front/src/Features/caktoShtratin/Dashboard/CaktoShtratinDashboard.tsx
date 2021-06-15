import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import CaktoShtratinDetails from '../Details/CaktoShtratinDetails';
import CaktoShtratinForm from '../Form/CaktoShtratinForm';
import CaktoShtratinList from './CaktoShtratinList';


export default observer( function CaktoShtratinDashboard() {
    
    const {caktoShtratinStore} = useStore();
    const {selectedCaktoShtratin, editMode} = caktoShtratinStore;

    useEffect(() => {
      caktoShtratinStore.loadcaktoShtreterit();
    }, [])
  
    if(caktoShtratinStore.loadingInitial) return <LoadingComponent content='Loading'/>


    return (
        <Grid>
            <Grid.Column width='10'>
                <CaktoShtratinList />
                <div>
                <Button onClick={() => caktoShtratinStore.openForm()} style = {{marginLeft:530, marginTop:5}} positive content='Cakto Shtratin'/>
            </div>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCaktoShtratin && !editMode &&
                <CaktoShtratinDetails/>}
                {editMode &&
                <CaktoShtratinForm />}
            </Grid.Column>
        </Grid>
    )
})