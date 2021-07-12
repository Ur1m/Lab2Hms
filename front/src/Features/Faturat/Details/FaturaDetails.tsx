import React from 'react';
import { Button, Card,Label, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { IPacientetDropDown, IPacienti } from '../../../app/models/IPacienti';
import { useStore } from '../../../app/stores/store';

export default function FaturaDetails() {
    const {faturaStore} = useStore();
    const {selectedFatura: Fatura, openForm, cancelSelectedFatura} = faturaStore;

    if(!Fatura) return <LoadingComponent />;
    
    return (
        <Card fluid>
        {/* <Image src={`/assets/FaturaImages/${Fatura.fatura_id}.jpg`} /> */}
        <Card.Content>
          <Card.Header>{Fatura.titulli}</Card.Header>
          <Card.Description>
                Pershkrimi: {Fatura.pershkrimi}
          </Card.Description>
          <label>Pacienti: {Fatura.pacient?.emri + " " + Fatura.pacient?.mbimeri}</label><br/>
          <label>Statusi: {Fatura.statusi}</label><br/>
          Shuma: <Label basic content={Fatura.shuma + " euro"}/>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(Fatura.fatura_Id)} basic color='blue' content='Ndrysho'/>
                <Button onClick={cancelSelectedFatura} basic color='blue' content='Anulo'/>
            </Button.Group>
        </Card.Content>
      </Card >
    )
}