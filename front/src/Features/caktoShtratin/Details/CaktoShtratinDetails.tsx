import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function CaktoShtratinDetails() {
    const {caktoShtratinStore} = useStore();
    const {selectedCaktoShtratin: caktoShtratin, openForm, cancelCaktoShtratin} = caktoShtratinStore;

    if(!caktoShtratin) return <LoadingComponent />;

    return (
        <Card fluid>
        {/* <Image src={`/assets/FaturaImages/${Fatura.fatura_id}.jpg`} /> */}
        <Card.Content>
          <Card.Header>{caktoShtratin.pacient_id}</Card.Header>
          <Card.Description>
                {caktoShtratin.shtrat_id}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(caktoShtratin.caktoshtratin_id)} basic color='blue' content='Ndrysho'/>
                <Button onClick={cancelCaktoShtratin} basic color='blue' content='Anulo'/>
            </Button.Group>
        </Card.Content>
      </Card >
    )
}