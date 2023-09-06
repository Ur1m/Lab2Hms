import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {  Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { StoreLlojiShtratit, useStore, useStoreLlojiShtratit } from '../../../app/stores/store';
import LlojiShtratitDetails from '../Details/LlojiShtratitDetails';
import LlojiShtratitDesign from './LlojiShtratitDesign';
import LlojiShtratitList from './LlojiShtratitList';


export default observer( function LlojiShtratitDashboard() {
    
    const {LlojiShtratitStore} = useStoreLlojiShtratit();
    const{llojiShtreterve,openForm} = LlojiShtratitStore;



    return (
        <React.Fragment>

            <LlojiShtratitDesign />

        </React.Fragment>
    )
})