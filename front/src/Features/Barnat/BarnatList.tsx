import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { Button, Header, Icon, Image, Item, Modal, Segment } from "semantic-ui-react";
import { useStoreBarnat } from "../../app/stores/store";

export default observer( function BaratList () {
    const {BarnatStore}=useStoreBarnat();
    const{Barnat,selectBarna,openForm,selectedBarna,deleteBarna}=BarnatStore;
    const [open, setOpen] = React.useState(false)

    useEffect(()=>{
        BarnatStore.loadBarnat();
    },[BarnatStore]);

    function handleDelete( id: string){
        
        deleteBarna(id);
        setOpen(false);
    }
    return (
        <React.Fragment>
            <Item.Group>
           
           <Button onClick={()=>openForm()}  positive content='AddBarna'/>
           </Item.Group>
           
        <React.Fragment>
            
           <Segment clearing>
            <Item.Group divided>
                {Barnat.map(b =>(
                     <Item key={b.barnat_Id}>
                     <Item.Content>
                         <Item.Header as='a'>{b.bName}</Item.Header>
                         <Item.Content >
                         <Image src={b.image}  width={50} height={50}/>
                         </Item.Content>
                       
                         <Item.Extra>
                            
                             <Button onClick={()=>selectBarna(b.barnat_Id)} floated="right" content='View' color='blue'/>
                             <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        name={b.barnat_Id}
                                       
                                        floated='right' 
                                        content='Delete' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Delete Barna' />
                                <Modal.Content>
                                    <p>
                                        Are you sure that you want to delete Paisjen:{b.bName}
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button color='green' onClick={() =>handleDelete(b.barnat_Id) }>
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
        </React.Fragment>
    )

}
)