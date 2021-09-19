import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import AmbulancaDetails from './AmbulancaDetails';
import AmbulancaForm from './AmbulancaForm';
import AmbulancaTable from './AmbulancaTable';
import AmbulancaList from './AmbulancaList';
import { useStore, useStoreAmbulancat, useStoreLaboratori } from '../../app/stores/store';

export default observer(function AmbulancaDashboard() {

    const {AmbulancaStore} = useStoreAmbulancat();
    const {selectAmbulancat,loadAmbulancat,selectedAmbulanca :Ambulanca, openForm,cancelSelectedAmbulancat,editMode,deleteAmbulancat,Ambulancat,loading} = AmbulancaStore;

    useEffect(() => {
        AmbulancaStore.loadAmbulancat();
    }, [])

    


    return (
        <React.Fragment>
            <AmbulancaTable />
        </React.Fragment>
    )
})