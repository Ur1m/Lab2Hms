import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react"
import { Button, Grid, GridColumn } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { IDoktori } from "../../app/models/Doktori";
import { IPacienti } from "../../app/models/IPacienti";
import PacientatStore from "../../app/store/PacientatStore"
import { useStorePacientat } from "../../app/stores/store";
import  PacentatDetails  from "./PacentatDetails";
import { PacientatForm } from "./PacientatForm";
import PacientatList  from "./PacientatList";

export default  observer( function  PacientiDashboard(){
    const {PacientatStore}=useStorePacientat();
    const{pacientat,openForm}=PacientatStore;
  

    return(
        <Grid>
        <Grid.Column width={10}>
         

           
     <PacientatList  /*deletePacienti={handledeletePacienti}*//> 
     <Button onClick={()=>openForm()}floated="right"   content='AddPacientat'/>
            
        </Grid.Column>
        <Grid.Column width={6}>
           {PacientatStore.selectedPacienti &&  !PacientatStore.editmode &&<PacentatDetails />}
            {PacientatStore.editmode &&<PacientatForm 
            key={PacientatStore.selectedPacienti && PacientatStore.selectedPacienti.pacient_Id || 0}
            />}
        </Grid.Column>
    </Grid>
    )
}
);