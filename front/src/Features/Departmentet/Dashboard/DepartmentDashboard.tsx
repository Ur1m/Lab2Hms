import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DepartmentDetails from '../Details/DepartmentDetails';
import DepartmentForm from '../Form/DepartmentForm';
import DepartmentList from './DepartmentList';


export default observer( function DepartmentDashboard() {
    
    const {departmentStore} = useStore();
    const {selectedDepartment, editMode} = departmentStore;

    useEffect(() => {
      departmentStore.loadDepartamentet();
    }, [])
  
    if(departmentStore.loadingInitial) return <LoadingComponent content='Loading'/>


    return (
        <Grid>
            <Grid.Column width='10'>
                <DepartmentList />
                <div>
                <Button onClick={() => departmentStore.openForm()} style = {{marginLeft:530, marginTop:5}} positive content='Shto Departament'/>
            </div>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedDepartment && !editMode &&
                <DepartmentDetails/>}
                {editMode &&
                <DepartmentForm />}
            </Grid.Column>
        </Grid>
    )
})