import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, ButtonGroup, Card } from 'semantic-ui-react'
import LoadingComponent from '../../app/layout/LoadingComponent';
import { IPacienti } from '../../app/models/IPacienti'
import { useStorePacientat } from '../../app/stores/store';
import {format} from 'date-fns';

/*interface IProps{
    selectedPacienti:IPacienti;
    seteditmode:(editmode:boolean)=>void;
    setselectedPacienti:(Pacienti:IPacienti |null)=>void;
  }*/
  
  export default observer( function PacentatDetails ()  {

    const {PacientatStore}=useStorePacientat();
    const{selectedPacienti}=PacientatStore

    if(!selectedPacienti) return <LoadingComponent/>;

      return (
          <Card fluid>
      
      <Card.Content>
        <Card.Header>{selectedPacienti.emri}</Card.Header>
        
        <Card.Description>
          {selectedPacienti.mbimeri}.
        </Card.Description>
        <Card.Description>
          {format(selectedPacienti.ditlindja!,'dd mmm yyyy')}.
        </Card.Description>
        <Card.Description>
          {selectedPacienti.adresa}.
        </Card.Description>
        <Card.Description>
          {selectedPacienti.qyteti}.
        </Card.Description>
        <Card.Description>
          {selectedPacienti.grupigjakut}.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
            <Button onClick={()=>PacientatStore.openForm(selectedPacienti!.pacient_Id)}basic color='blue' content="Edit"/>
            <Button  onClick={()=>PacientatStore.canceleSelectedPacienti()}basic color='grey' content="Cancele"/>
        </ButtonGroup>
      </Card.Content>
    </Card>
      )
  }
  );
  