import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, ButtonGroup, Card,Image } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStorePaisjet } from "../../app/stores/store";

export default observer( function PacentatDetails ()  {

    const {PaisjetStore}=useStorePaisjet();
    const{selectedPaisja}=PaisjetStore

    useEffect(()=>{
     PaisjetStore.department(selectedPaisja!.department_Id)
    },[PaisjetStore]);

    

      return (
          <Card fluid>
          
          <Image src={selectedPaisja!.image} wrapped ui={false} />
      <Card.Content>
     
        <Card.Description>{"Emri :"+selectedPaisja!.emertimi}</Card.Description>
        
       
        <Card.Description>
          {"Servisimi :"+format(selectedPaisja!.servisimi!,'MMMM d, yyyy')}.
        </Card.Description>
        <Card.Description>
          {"Pershkrimi"+selectedPaisja!.pershkrimi}.
        </Card.Description>
        <Card.Description>
          {"Department"+PaisjetStore.departmentname}.
        </Card.Description>
      
    
      </Card.Content>
      <Card.Content extra>
       
      </Card.Content>
    </Card>
      )
  }
  );

