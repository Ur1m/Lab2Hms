import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IPacienti } from '../../app/models/IPacienti';
import { useStorePacientat } from '../../app/stores/store';



export default observer( function PacientatList () {
    const {PacientatStore}=useStorePacientat();
    const{pacientat,selectPacineti,openForm,selectedPacienti}=PacientatStore
    const[search,setsearch]=useState("");

    useEffect(()=>{
        PacientatStore.loadPacientat();
    },[PacientatStore]);
    return (
        <React.Fragment>
            <Item.Group>
            <input type="text " placeholder="Search.." onChange={event=>setsearch(event.target.value)}/>
            <Button onClick={()=>openForm()}floated="right"  positive content='AddPacientat'/>
            </Item.Group>
           <Segment clearing>
            <Item.Group divided>
                {pacientat.filter((val)=>{
                    if(search==""){
                        return val;
                    }
                    else if(val.emri.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                        return val;
                    }
                }).map(p =>(
                     <Item key={p.pacient_Id}>
                     <Item.Content>
                         <Item.Header as='a'>{p.emri+" "+p.mbimeri}</Item.Header>
                         
                       
                         <Item.Extra>
                             <Button as={Link} to={`/Terminet/${p.pacient_Id}`} floated="right" content="View Terminet" color='yellow'/>
                             <Button onClick={()=>selectPacineti(p.pacient_Id)} floated="right" content='View' color='blue'/>
                             <Button onClick={()=>PacientatStore.deletePacienti(p.pacient_Id)} floated="right" content='Delete' color='red'/>
                            
                         </Item.Extra>
                     </Item.Content>
                     </Item>

                ))}
            
        </Item.Group>
        
        </Segment>
        </React.Fragment>
    )

}
)

