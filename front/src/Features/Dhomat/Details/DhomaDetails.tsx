import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function DhomaDetails() {
    const {dhomaStore} = useStore();
    const {selectedDhoma: Dhoma, openForm, cancelSelectedDhoma} = dhomaStore;

    if(!Dhoma) return <LoadingComponent />;

    return (
        <Card fluid>
        {/* <Image src={`/assets/DepartmentImages/${Dhoma.dhoma_id}.jpg`} /> */}
        <Card.Content>
          <Card.Header>{Dhoma.dhoma_id}</Card.Header>
          <Card.Description>
                {Dhoma.pershkrimi}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(Dhoma.dhoma_id)} basic color='blue' content='Ndrysho'/>
                <Button onClick={cancelSelectedDhoma} basic color='blue' content='Anulo'/>
            </Button.Group>
        </Card.Content>
      </Card >
    )
}