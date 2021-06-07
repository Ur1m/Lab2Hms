import React, { useEffect} from 'react'
import { Button,  Item, Label, Segment } from 'semantic-ui-react'
import { ILaboratori } from '../../../app/models/ILaboratori';

interface IProps{
    laboratoret: ILaboratori[]
    selectLaboratori: (id: string) => void;
    deleteLaboratori:(id:string)=>void;
}

const LaboratoriList: React.FC<IProps>= ({laboratoret,selectLaboratori,deleteLaboratori}) => {
    return (
        <Segment clearing>
        <Item.Group divided>
            {laboratoret.map(laboratori =>(
                 <Item key={laboratori.id}>
                 <Item.Content>
                   <Item.Header as='a'>Emri: {laboratori.emri}</Item.Header>
                   <Item.Meta>Data: {laboratori.date}</Item.Meta>
                   <Item.Description>
                     <div>Numri Personal: {laboratori.nrId}</div>
                     <div>Adresa: {laboratori.city}</div>
                   </Item.Description>
                   <Item.Extra>
                       <Button
                        onClick={()=>selectLaboratori(laboratori.id)}
                        floated='right' 
                        content= 'Shiko me shume'
                         color='blue'
                         />
                          <Button
                        onClick={()=>deleteLaboratori(laboratori.id)}
                        floated='right' 
                        content= 'Fshij'
                         color='red'
                         />
                       <Item.Meta>Mosha: {laboratori.mosha}</Item.Meta>
                   </Item.Extra>
                 </Item.Content>
               </Item>
            ))}
       
      </Item.Group>
        </Segment>
    )
}

export default LaboratoriList;
