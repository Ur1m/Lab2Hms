import React, { useEffect }  from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { ILaboratori } from '../../../app/models/ILaboratori';

interface IProps{
    laboratori: ILaboratori
    setEditMode:(editMode: boolean)=>void;
    setSelectedLaboratori:(laboratori:ILaboratori|null)=>void;
}

const LaboratoriDetails: React.FC<IProps> = ({
    laboratori,
    setEditMode,
    setSelectedLaboratori
}) => {
    return (
        <Card fluid>
        <Card.Content>
          <Card.Header>{laboratori.emri}</Card.Header>
          <Card.Meta>
            <span>{laboratori.date}</span>
          </Card.Meta>
          <Card.Description>
            {laboratori.nrId}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
         <Button.Group widths ={2}>
             <Button onClick={() => setEditMode(true)} 
             basic
             color='blue' 
             content='Ndrysho' />
             <Button onClick={()=> setSelectedLaboratori(null)}
              basic 
              color='grey' 
              content='Anulo' />
         </Button.Group>
        </Card.Content>
      </Card>
    )
}

export default LaboratoriDetails;
