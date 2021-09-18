import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore, useStoreShtrat } from '../../../app/stores/store';
import ShtratDetails from '../Details/ShtratDetails';
import ShtratTable from '../Form/ShtratTable';
import ShtratList from './ShtratList';


export default observer( function ShtratDashboard() {
    
    const {shtratStore} = useStore();
    const {selectedShtrat, editMode} = shtratStore;

    useEffect(() => {
      shtratStore.loadShtreter();
    }, [])
  
    if(shtratStore.loadingInitial) return <LoadingComponent content='Loading'/>


    return (
        
        <ShtratTable/>

    )
});