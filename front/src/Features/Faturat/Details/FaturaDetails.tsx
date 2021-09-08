import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Card,Label, Icon, Image } from 'semantic-ui-react';
import { format } from 'util';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { IPacientetDropDown, IPacienti } from '../../../app/models/IPacienti';
import FaturaStore from '../../../app/stores/FaturaStore';
import { useStore, useStoreFaturat } from '../../../app/stores/store';

export default observer (function FaturaDetails() {
    const {FaturatStore} = useStoreFaturat();
    const {selectedFatura,closeDetails} = FaturatStore;

    if(!selectedFatura) return <LoadingComponent />;
    
    return (
        <Card fluid>
        {/* <Image src={`/assets/FaturaImages/${Fatura.fatura_id}.jpg`} /> */}
        <Card.Content>
          <Card.Header>{selectedFatura.titulli}</Card.Header>
          <Card.Description>
                Pershkrimi: {selectedFatura.pershkrimi}
          </Card.Description>
          <label>Pacienti: {selectedFatura.pacient?.emri + " " + selectedFatura.pacient?.mbimeri}</label><br/>
          <Card.Description>
          {"Krijuar më:" +format(selectedFatura.krijuarme!,'MMMM d, yyyy')}.
          </Card.Description>
          <label>Statusi: {selectedFatura.statusi}</label><br/>
          Shuma: <Label basic content={selectedFatura.shuma + " euro"}/>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => FaturatStore.openForm(selectedFatura.fatura_Id)} basic color='blue' content='Ndrysho'/>
                <Button onClick={()=>closeDetails()} basic color='blue' content='Anulo'/>
            </Button.Group>
        </Card.Content>
      </Card >
    )
}
);