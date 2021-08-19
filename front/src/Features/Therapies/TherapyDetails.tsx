import { rejects } from "assert";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { Button, ButtonGroup, Card } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { IPacienti } from "../../app/models/IPacienti";
import { useStoreDoktorat, useStorePacientat, useStoreTerminet, useStoreTherapies } from "../../app/stores/store";

export default observer( function TherapyDetails () {

    
    const {TherapyStore} = useStoreTherapies();
    const {selectedTherapy, editmode} = TherapyStore;

    if(!selectedTherapy) return <LoadingComponent />;
    

      return (
          <Card fluid>
            
       
 
      
      <Card.Content>
      <Card.Description>{"Statusi i terapis "+selectedTherapy.onGoing}</Card.Description>
        
        <Card.Description>{selectedTherapy.terapia}</Card.Description>
        
        
       
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          {   <Button onClick={()=>TherapyStore.openForm(selectedTherapy!.therapy_Id)}basic color='blue' content="Edit"/>}
            <Button  onClick={()=>TherapyStore.canceleSelectedTerapin()}basic color='grey' content="Cancele"/>
        </ButtonGroup>
      </Card.Content>
    </Card>
      )
  }
  );




  