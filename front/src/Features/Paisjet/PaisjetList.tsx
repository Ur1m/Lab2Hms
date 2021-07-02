import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { useEffect } from "react";
import { Button, Header, Icon, Item, Modal, Segment } from "semantic-ui-react";
import { useStorePaisjet } from "../../app/stores/store";

export default observer( function PacientatList () {
    const {PaisjetStore}=useStorePaisjet();
    const{paisjet,selectPaisja,openForm,selectedPaisja,deletePaisja}=PaisjetStore;
    const [open, setOpen] = React.useState(false)

    useEffect(()=>{
        PaisjetStore.loadPaisjet();
    },[PaisjetStore]);

    function handleDelete( id: string){
        
        deletePaisja(id);
        setOpen(false);
        PaisjetStore.selectedPaisja=undefined;
    }
    function del(id:string){
        selectPaisja(id);
        setOpen(true);
    }
    return (
        <React.Fragment>
            <Item.Group>
           
            <Button onClick={()=>openForm()}floated="right"  positive content='AddPaisjet'/>
            </Item.Group>
           <Segment clearing>
            <Item.Group divided>
                {paisjet.map(p =>(
                     <Item key={p.paisja_Id}>
                     <Item.Content>
                         <Item.Header as='a'>{p.emertimi}</Item.Header>
                         
                       
                         <Item.Extra>
                            
                             <Button onClick={()=>selectPaisja(p.paisja_Id)} floated="right" content='View' color='blue'/>
                             <Button onClick={()=>del(p.paisja_Id)} floated="right" content='delete' color='red'/>
                              <Modal
                                closeIcon
                                open={open}
                               
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Delete terminin' />
                                <Modal.Content>
                                    <p>
                                        Are you sure that you want to delete Paisjen:{selectedPaisja?.emertimi}?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button color='green' onClick={() =>handleDelete(selectedPaisja!.paisja_Id) }>
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
