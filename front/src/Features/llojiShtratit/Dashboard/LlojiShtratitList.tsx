import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { Button, Header, Icon, Image, Item, Modal, Segment } from "semantic-ui-react";
import { useStoreLlojiShtratit } from "../../../app/stores/store";

export default observer( function LlojiShtratitList () {
    const {LlojiShtratitStore} = useStoreLlojiShtratit();
    const{llojiShtreterve,selectLlojiShtratit,openForm,selectedLlojiShtratit,deleteLlojiShtratit} = LlojiShtratitStore;
    const [open, setOpen] = React.useState(false)

    useEffect(()=>{
        LlojiShtratitStore.loadllojiShtreterve();
    },[LlojiShtratitStore]);

    function handleDelete( id: string){
        
        deleteLlojiShtratit(id);
        setOpen(false);
    }
    return (
        <React.Fragment>
            <Item.Group>
           
           <Button onClick={()=>openForm()}  positive content='Shto lloje te shtreterve'/>
           </Item.Group>
           
        <React.Fragment>
            
           <Segment clearing>
            <Item.Group divided>
                {llojiShtreterve.map(ll =>(
                     <Item key={ll.llojiShtratit_id}>
                     <Item.Content>
                         <Item.Header as='a'>{ll.emri}</Item.Header>
                         <Item.Content >
                         <Image src={ll.image}  width={50} height={50}/>
                         </Item.Content>
                       
                         <Item.Extra>
                            
                             <Button onClick={()=>selectLlojiShtratit(ll.llojiShtratit_id)} floated="right" content='View' color='blue'/>
                             <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        name={ll.llojiShtratit_id}
                                       
                                        floated='right' 
                                        content='Delete' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Fshij llojin e shtratit' />
                                <Modal.Content>
                                    <p>
                                        A jeni i sigurt qe deshironi te fshini llojin e shtratit:{ll.emri}
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button color='green' onClick={() =>handleDelete(ll.llojiShtratit_id) }>
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