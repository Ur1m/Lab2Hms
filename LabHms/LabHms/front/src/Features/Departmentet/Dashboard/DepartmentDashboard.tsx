import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DepartmentDetails from '../Details/DepartmentDetails';
import DepartmentForm from '../Form/DepartmentForm';
import DepartmentTable from '../Form/DepartmentTable';
import DepartmentList from './DepartmentList';


export default observer(function DepartmentDashboard() {

    const { departmentStore } = useStore();
    const { selectedDepartment, editMode } = departmentStore;

    useEffect(() => {
        departmentStore.loadDepartamentet();
    }, [])

    if (departmentStore.loadingInitial) return <LoadingComponent content='Loading' />


    return (
        <React.Fragment>
            <DepartmentTable />
        </React.Fragment>
    )
})