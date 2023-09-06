import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore, useStoreShtrat } from '../../../app/stores/store';

export default observer( function ShtratDetails() {

  const {ShtratStore}=useStoreShtrat();
  const{selectedShtrat,closeDetails}=ShtratStore

    if(!selectedShtrat) return <LoadingComponent />;

    return (
        <Card fluid>
        {/* <Image src={`/assets/DepartmentImages/${Department.department_id}.jpg`} /> */}
        <Card.Content>
          <Card.Header>Numri i shtratit: {selectedShtrat.nrShtratit}</Card.Header>
          <Card.Description>
                Pershkrimi: {selectedShtrat.pershkrimi}<br/>
                Statusi: {selectedShtrat.statusi}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => ShtratStore.openForm(selectedShtrat.shtrat_id)} basic color='blue' content='Ndrysho'/>
                <Button onClick={() => closeDetails()} basic color='blue' content='Anulo'/>
            </Button.Group>
        </Card.Content>
      </Card >
    )
}
);