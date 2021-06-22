import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { Button, ButtonGroup, Card,Image } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStorePaisjet } from "../../app/stores/store";

export default observer( function PacentatDetails ()  {

    const {PaisjetStore}=useStorePaisjet();
    const{selectedPaisja}=PaisjetStore

    if(!selectedPaisja) return <LoadingComponent/>;

      return (
          <Card fluid>
            <Image src={`${selectedPaisja.image}`} />
      
      <Card.Content>
      <Card.Description>
          {"ID :"+selectedPaisja.paisja_Id}.
        </Card.Description>
        <Card.Description>{"Emri :"+selectedPaisja.emertimi}</Card.Description>
        
       
        <Card.Description>
          {"Servisimi :"+format(selectedPaisja.servisimi!,'dd mm yyyy')}.
        </Card.Description>
        <Card.Description>
          {"Pershkrimi"+selectedPaisja.pershkrimi}.
        </Card.Description>
      
    
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
            <Button onClick={()=>PaisjetStore.openForm(selectedPaisja!.paisja_Id)}basic color='blue' content="Edit"/>
            <Button  onClick={()=>PaisjetStore.canceleSelectedPaisja()}basic color='grey' content="Cancele"/>
        </ButtonGroup>
      </Card.Content>
    </Card>
      )
  }
  );

