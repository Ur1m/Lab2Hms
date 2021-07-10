
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Item,Button,Label, Segment, Modal, Header, Icon } from 'semantic-ui-react';

import { IDoktori } from '../../app/models/Doktori';
import { useStoreDoktorat } from '../../app/stores/store';




export default observer(function DoktoratList () {
    const {DoktoratStore}=useStoreDoktorat();
    const{doktorat,selectDoktori,deleteDoktori,openForm,selectedDoktori}=DoktoratStore;
    const [open, setOpen] = React.useState(false)
    
    const[search,setsearch]=useState("");
    useEffect(()=>{
        DoktoratStore.loadDoktorat();
    },[DoktoratStore]);
    function handleDelete( id: string){
        
        deleteDoktori(id);
        setOpen(false);
        DoktoratStore.selectedDoktori=undefined;
    }
    function del(id:string){
        selectDoktori(id);
        
        setOpen(true);
        
    }
    return (
        <React.Fragment>
            <Item.Group>
            <div className="ui left icon input"><input type="text" placeholder="Search users..." onChange={event=>setsearch(event.target.value)}/><i aria-hidden="true" className="users icon"></i></div>
            <Button onClick={()=>openForm()}floated="right"  positive content='AddDoktorat'/>
            </Item.Group>
        <Segment clearing>
            <Item.Group divided>
                {doktorat.filter((val)=>{
                    if(search==""){
                        return val;
                    }
                    else if(val.emri.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                        return val;
                    }
                }).map(Doktori =>(
                     <Item key={Doktori.mjeku_Id}>
                     <Item.Content>
                         <Item.Header as='a'>{Doktori.emri+"  "+Doktori.mbimeri}</Item.Header>
                        
                       
                         <Item.Extra>
                             <Button onClick={()=>selectDoktori(Doktori.mjeku_Id)} floated="right" content='View' color='blue'/>
                             <Button onClick={()=>del(Doktori.mjeku_Id)} floated="right" content='Delete' color='red'/>
                             <Modal
                                closeIcon
                                open={open}
                               
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Delete terminin' />
                                <Modal.Content>
                                    <p>
                                        Are you sure that you want to delete Paisjen:{selectedDoktori?.emri}?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button color='green' onClick={() =>handleDelete(selectedDoktori!.mjeku_Id) }>
                                        <Icon name='checkmark' /> Yes
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                             <Label basic content={Doktori.depName}/>
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
