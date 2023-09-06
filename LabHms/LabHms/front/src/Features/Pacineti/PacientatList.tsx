import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Button, Header, Icon, Item, Label, Modal, Segment } from 'semantic-ui-react';
import { IPacienti } from '../../app/models/IPacienti';
import "b.css";
import { useStorePacientat } from '../../app/stores/store';



export default observer( function PacientatList () {
    const {PacientatStore}=useStorePacientat();
    const{pacientat,selectPacineti,openForm,selectedPacienti,deletePacienti}=PacientatStore
    const[search,setsearch]=useState("");
    const [open, setOpen] = React.useState(false)

    useEffect(()=>{
        PacientatStore.loadPacientat();
    },[PacientatStore]);
    function handleDelete( id: string){
        
        deletePacienti(id);
        setOpen(false);
        PacientatStore.selectedPacienti=undefined;
    }
    function del(id:string){
        selectPacineti(id);
        
        setOpen(true);
        
    }
    return (
        <React.Fragment>
            <Item.Group>
            <div className="ui left icon input"><input type="text" placeholder="Search users..." onChange={event=>setsearch(event.target.value)}/><i aria-hidden="true" className="users icon"></i></div>
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
                             <Button onClick={()=>del(p.pacient_Id)} floated="right" content='delete' color='red'/>
                              <Modal
                                closeIcon
                                open={open}
                               
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Delete terminin' />
                                <Modal.Content>
                                    <p>
                                        Are you sure that you want to delete Paisjen:{selectedPacienti?.emri}?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button color='green' onClick={() =>handleDelete(selectedPacienti!.pacient_Id) }>
                                        <Icon name='checkmark' /> Yes
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            
                            
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

