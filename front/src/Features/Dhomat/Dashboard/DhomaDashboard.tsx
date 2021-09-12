import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DhomaDetails from '../Details/DhomaDetails';
import DhomaForm from '../Form/DhomaForm';
import DhomaTable from '../Form/DhomaTable';
import DhomaList from './DhomaList';


export default observer( function DhomaDashboard() {
    
    const {dhomaStore} = useStore();
    const {selectedDhoma, editMode} = dhomaStore;

    useEffect(() => {
      dhomaStore.loadDhomat();
    }, [])
  
    if(dhomaStore.loadingInitial) return <LoadingComponent content='Loading'/>


    return (
        <DhomaTable/>
    )
})