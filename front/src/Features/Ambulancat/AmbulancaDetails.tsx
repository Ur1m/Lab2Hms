import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore, useStoreAmbulancat, useStoreLaboratori } from '../../app/stores/store';

export default function AmbulancaDetails() {
    const {AmbulancaStore} = useStoreAmbulancat();
    const {selectAmbulancat,selectedAmbulanca :Ambulanca, openForm,editMode,cancelSelectedAmbulancat,loading} = AmbulancaStore;

    if(!Ambulanca) return <LoadingComponent />;

    return (
        <Card fluid>
        <Image src={`${Ambulanca.fotografia}`} />
        <Card.Content>
          <Card.Header>{Ambulanca.tipi}</Card.Header>
          
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(Ambulanca.amb_Id)} basic color='blue' content='Ndrysho'/>
                <Button onClick={cancelSelectedAmbulancat} basic color='blue' content='Anulo'/>
            </Button.Group>
        </Card.Content>
      </Card >
    )
}