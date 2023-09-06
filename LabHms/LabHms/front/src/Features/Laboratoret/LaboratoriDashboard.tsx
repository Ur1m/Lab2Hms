import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import LaboratoriDetails from './LaboratoriDetails';
import LaboratoriForm from './LaboratoriForm';
import LaboratoriTable from './LaboratoriTable';
import LaboratoriList from './LaboratoriList';
import { useStore, useStoreLaboratori } from '../../app/stores/store';

export default observer(function LaboratoriDashboard() {

    const {LaboratoriStore} = useStoreLaboratori();
    const {selectLaboratori,loadLaboratoret,selectedLaborator :Laboratori, openForm,cancelSelectedLaborator,editMode,deleteLaborator,Laboratort,loading} = LaboratoriStore;

    useEffect(() => {
        LaboratoriStore.loadLaboratoret();
    }, [])

    


    return (
        <React.Fragment>
            <LaboratoriTable />
        </React.Fragment>
    )
})