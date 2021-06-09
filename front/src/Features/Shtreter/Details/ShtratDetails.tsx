import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function ShtratDetails() {
    const {shtratStore} = useStore();
    const {selectedShtrat: Shtrat, openForm, cancelSelectedShtrat} = shtratStore;

    if(!Shtrat) return <LoadingComponent />;

    return (
        <Card fluid>
        <Image src={`/assets/FaturaImages/${Shtrat.shtrat_id}.jpg`} />
        <Card.Content>
          <Card.Header>{Shtrat.nrshtratit}</Card.Header>
          <Card.Description>
                {Shtrat.pershkrimi}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(Shtrat.shtrat_id)} basic color='blue' content='Ndrysho'/>
                <Button onClick={cancelSelectedShtrat} basic color='blue' content='Anulo'/>
            </Button.Group>
        </Card.Content>
      </Card >
    )
}