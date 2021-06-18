import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import LlojiShtratitDetails from '../Details/LlojiShtratitDetails';
import LlojiShtratitForm from '../Form/LlojiShtratitForm';
import LlojiShtratitList from './LlojiShtratitList';


export default observer( function LlojiShtratitDashboard() {
    
    const {llojiShtratitStore} = useStore();
    const {selectedLlojiShtratit, editMode} = llojiShtratitStore;

    useEffect(() => {
      llojiShtratitStore.loadllojiShtreterve();
    }, [])
  
    if(llojiShtratitStore.loadingInitial) return <LoadingComponent content='Loading'/>


    return (
        <Grid>
            <Grid.Column width='10'>
                <LlojiShtratitList />
                <div>
                <Button onClick={() => llojiShtratitStore.openForm()} style = {{marginLeft:530, marginTop:5}} positive content='Shto llojin e ri te Shtratit'/>
            </div>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedLlojiShtratit && !editMode &&
                <LlojiShtratitDetails/>}
                {editMode &&
                <LlojiShtratitForm />}
            </Grid.Column>
        </Grid>
    )
})