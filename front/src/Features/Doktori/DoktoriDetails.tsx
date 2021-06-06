import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card , ButtonGroup, Button} from 'semantic-ui-react';
import agent from '../../app/api/agent';
import { IDoktori } from '../../app/models/Doktori';
import doktoretStor from '../../app/store/doktoretStor';
interface IProps{
  selectedDoktori:IDoktori ;
  seteditmode:(editmode:boolean)=>void;
  setselectedDoktori:(lajm:IDoktori |null)=>void;
}

export const DoktoratDetails: React.FC<IProps> = ({selectedDoktori,seteditmode,setselectedDoktori}) => {
    return (
        <Card fluid>
    
    <Card.Content>
      <Card.Header>{selectedDoktori.emri}</Card.Header>
      
      <Card.Description>
        {selectedDoktori.mbimeri}.
      </Card.Description>
      <Card.Description>
        {selectedDoktori.ditlindja}.
      </Card.Description>
      <Card.Description>
        {selectedDoktori.specializimi}.
      </Card.Description>
      <Card.Description>
        {selectedDoktori.depName}.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <ButtonGroup widths={2}>
          <Button  onClick={()=> seteditmode(true)}basic color='blue' content="Edit"/>
          <Button  onClick={()=>setselectedDoktori(null)}basic color='grey' content="Cancele"/>
      </ButtonGroup>
    </Card.Content>
  </Card>
    )
}
