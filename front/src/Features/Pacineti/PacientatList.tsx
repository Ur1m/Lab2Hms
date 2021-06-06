import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IPacienti } from '../../app/models/IPacienti';
import { useStorePacientat } from '../../app/stores/store';



export default observer( function PacientatList () {
    const {PacientatStore}=useStorePacientat();
    const{pacientat,selectPacineti}=PacientatStore

    useEffect(()=>{
        PacientatStore.loadPacientat();
    },[PacientatStore]);
    return (
        <Segment clearing>
            <Item.Group divided>
                {pacientat.map(p =>(
                     <Item key={p.pacient_Id}>
                     <Item.Content>
                         <Item.Header as='a'>{p.emri}</Item.Header>
                         <Item.Description>
                             <div>{p.mbimeri}</div>
                         </Item.Description>
                       
                         <Item.Extra>
                             <Button onClick={()=>selectPacineti(p.pacient_Id)} floated="right" content='View' color='blue'/>
                             <Button onClick={()=>PacientatStore.deletePacienti(p.pacient_Id)} floated="right" content='Delete' color='red'/>
                            
                         </Item.Extra>
                     </Item.Content>
                     </Item>

                ))}
            
        </Item.Group>
        
        </Segment>
    )

}
)

