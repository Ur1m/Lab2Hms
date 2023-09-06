import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import { useStore } from '../../../app/stores/store';



export default observer(function InfermierjaList()
{
    const{infermierjaStore}=useStore();
    const{deleteInfermierja,infermieret, loading}=infermierjaStore;
    const[target, setTarget]= useState('');

    function handleInfermierjaDelete(e: SyntheticEvent<HTMLButtonElement>, infermierja_id:string){
        setTarget(e.currentTarget.name);
        deleteInfermierja(infermierja_id);
    }

    
    return (
        <Segment>
            <Item.Group divided>
                {infermieret.map(infermierja=>{
                    <Item key={infermierja.infermierja_id}>
                        <Item.Content>
                            <Item.Header as ='a'> {infermierja.emri}</Item.Header >
                                <Item.Meta>{infermierja.mbiemri}</Item.Meta>
                                <Item.Description>
                                    
                                    <div>{infermierja.departamenti}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button as ={Link} to={`/infermieret/${infermierja.infermierja_id}`}floated='right' content='View' color='blue'/>
                                    <Button
                                    name={infermierja.infermierja_id}
                                     loading={loading && target ===infermierja.infermierja_id} 
                                     onClick={(e)=>handleInfermierjaDelete(e,infermierja.infermierja_id)} 
                                     floated='right' 
                                     content='Delete' 
                                     color='red'/>
                                    <Label basic content={infermierja.koeficienti}/>


                                </Item.Extra>
                        </Item.Content>
                    </Item>

                   
                })}
            </Item.Group>
        </Segment>
    )
}
)