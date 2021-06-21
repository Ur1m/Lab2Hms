import { observer } from 'mobx-react';
import { useEffect } from 'react';

import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

import InfermierjaList from './InfermierjaList';



export default observer (function InfermierjaDashboard(){
        const {infermierjaStore}= useStore();
        
useEffect(() =>{
 infermierjaStore.loadInfermieret();
}, [infermierjaStore])

if(infermierjaStore.loadingInitial) return <LoadingComponent content='Loading app' />


    return (
        <Grid>
            <Grid.Column width ='10'>
                <InfermierjaList />
            </Grid.Column>
            
            <Grid.Column width ='6'>
              <h2>Infermierja filters</h2>
            </Grid.Column>
        </Grid>
    )
})