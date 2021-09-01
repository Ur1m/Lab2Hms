import { rejects } from "assert";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { Button, ButtonGroup, Card } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { IPacienti } from "../../app/models/IPacienti";
import { useStoreDoktorat, useStorePacientat, useStoreRaport, useStoreTerminet, useStoreTherapies } from "../../app/stores/store";

export default observer( function TherapyDetails () {

    
    const {RaportStore} = useStoreRaport();
    const {selectedRaport, editmode} = RaportStore;

    if(!selectedRaport) return <LoadingComponent />;
    

      return (
          <Card fluid>
            
       
 
      
      <Card.Content>
      <Card.Description>{"Statusi i terapis "+selectedRaport.date}</Card.Description>
        
        <Card.Description>{selectedRaport.raporti}</Card.Description>
        
        
       
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          {   <Button onClick={()=>RaportStore.openForm(selectedRaport!.raport_Id)}basic color='blue' content="Edit"/>}
            <Button  onClick={()=>RaportStore.canceleSelectedRaport()}basic color='grey' content="Cancele"/>
        </ButtonGroup>
      </Card.Content>
    </Card>
      )
  }
  );




  