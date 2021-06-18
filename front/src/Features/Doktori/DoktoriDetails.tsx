import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Card , ButtonGroup, Button} from 'semantic-ui-react';
import agent from '../../app/api/agent';
import { IDoktori } from '../../app/models/Doktori';
import { useStoreDoktorat } from '../../app/stores/store';



export default observer( function DoktoratDetails(){
  const {DoktoratStore}=useStoreDoktorat();
  const{selectedDoktori}=DoktoratStore;

    return (
        <Card fluid>
    
    <Card.Content>
      <Card.Description>{"Emri :"+selectedDoktori!.emri}</Card.Description>
      <Card.Description>{"ID :"+selectedDoktori!.mjeku_Id}</Card.Description>
      <Card.Description>
        {"Mbiemri :"+selectedDoktori!.mbimeri}.
      </Card.Description>
      <Card.Description>
        {"Ditlindja :"+format(selectedDoktori!.ditlindja!,'dd mmm yyyy')}
      </Card.Description>
      <Card.Description>
        {"Specializimi :"+selectedDoktori!.specializimi}.
      </Card.Description>
      <Card.Description>
        {"Departmenti :"+selectedDoktori!.depName}.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <ButtonGroup widths={2}>
          <Button  onClick={()=>DoktoratStore.openForm(selectedDoktori!.mjeku_Id)}basic color='blue' content="Edit"/>
          <Button  onClick={()=>DoktoratStore.canceleSelectedDoktori()}basic color='grey' content="Cancele"/>
      </ButtonGroup>
    </Card.Content>
  </Card>
    )
})
