import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreBarnat } from "../../app/stores/store";

export default observer( function BarnatDetails ()  {

    const {BarnatStore}=useStoreBarnat();
    const{selectedBarna}=BarnatStore

    if(!selectedBarna) return <LoadingComponent/>;

      return (
          <Card fluid>
            <Image src={`${selectedBarna.image}`} />
      
      <Card.Content>
     
        <Card.Description>{"Emri :"+selectedBarna.bName}</Card.Description>
        
       
        <Card.Description>
          {"DataRegjistirimit :"+format(selectedBarna.dataRegjistrimit!,'MMMM d, yyyy')}.
        </Card.Description>
        <Card.Description>
          {"Pershkrimi"+selectedBarna.description}.
        </Card.Description>
      
    
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
            <Button onClick={()=>BarnatStore.openForm(selectedBarna!.barnat_Id)}basic color='blue' content="Edit"/>
            <Button  onClick={()=>BarnatStore.canceleSelectedBarna()}basic color='grey' content="Cancele"/>
        </ButtonGroup>
      </Card.Content>
    </Card>
      )
  }
  );

