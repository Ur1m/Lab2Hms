import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function LlojiShtratitDetails() {
    const {llojiShtratitStore} = useStore();
    const {selectedLlojiShtratit: llojiShtratit, openForm, cancelSelectedLlojiShtratit} = llojiShtratitStore;

    if(!llojiShtratit) return <LoadingComponent />;

    return (
        <Card fluid>
        {/* <Image src={`/assets/DepartmentImages/${llojiShtratit.llojiShtratit_id}.jpg`} /> */}
        <Card.Content>
          <Card.Header>{llojiShtratit.emri}</Card.Header>
          <Card.Description>
                {llojiShtratit.pershkrimi}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(llojiShtratit.llojiShtratit_id)} basic color='blue' content='Ndrysho'/>
                <Button onClick={cancelSelectedLlojiShtratit} basic color='blue' content='Anulo'/>
            </Button.Group>
        </Card.Content>
      </Card >
    )
}