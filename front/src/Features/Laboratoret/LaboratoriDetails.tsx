import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore, useStoreLaboratori } from '../../app/stores/store';

export default function LaboratoriDetails() {
    const {LaboratoriStore} = useStoreLaboratori();
    const {selectLaboratori,selectedLaborator :Laboratori, openForm,cancelSelectedLaborator,editMode,deleteLaborator,Laboratort,loading} = LaboratoriStore;

    if(!Laboratori) return <LoadingComponent />;

    return (
        <Card fluid>
        <Image src={`${Laboratori.fotografia}`} />
        <Card.Content>
          <Card.Header>{Laboratori.emri}</Card.Header>
          <Card.Description>
                {Laboratori.pershkrimi}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(Laboratori.lab_Id)} basic color='blue' content='Ndrysho'/>
                <Button onClick={cancelSelectedLaborator} basic color='blue' content='Anulo'/>
            </Button.Group>
        </Card.Content>
      </Card >
    )
}