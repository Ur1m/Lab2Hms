import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect } from "react";
import { useState } from "react";

import { Link, RouteComponentProps, useParams } from "react-router-dom";
import { Button, Grid, Header, Icon, Item, Modal, Segment } from "semantic-ui-react";
import { history } from "../..";
import { useStoreTerminet } from "../../app/stores/store";
import { TerminatForm } from "./TerminatForm";
import TerminetDetails from "./TerminetDetails";


export default observer( function TerminetList () {
    const {TerminetStore}=useStoreTerminet();
    const{terminet,selectTermini,openForm,deleteTermini,withId,getTerminetwithId,nr,selectedTermini}=TerminetStore;
    const [open, setOpen] = React.useState(false)
    const {id}=useParams<{id:string}>();
    const [i,seti]=useState(1);
    const [v,setV]=useState(0);

    

    useEffect(()=>{
        TerminetStore.loadTerminet();
       //if(id) getTerminetwithId(id);
       setV(v+1);
      
    },[TerminetStore,id,withId]);
console.log(withId);
  

   
    function handleDelete( id: string){
        
        deleteTermini(id);
        setOpen(false);
    }

    
    
    return (
     <Grid>
         <Grid.Column width={10}>
            <Item.Group>
          
           {!id && <Button onClick={()=>openForm()}  positive content='AddTerminet'/>}
           {id && <Button as={Link} to={"/Pacientat"} positive content="GoBack"/>}
            </Item.Group>
          
              
            
                {terminet.filter(val=>{
                   if(id && val.pacient_Id==id || val.mjeku_Id==id){
                       return val;
                   }
                   else if(!id){
                       return val;
                   }
                   else{
                       
                   }
                  
                   
                }).map(p =>
                    (
                   
                       
                        <Segment clearing>  
                     <Item key={p.termini_ID}>
                     <Item.Content>
                         <Item.Header as='a'>{format(p.orari!,'MMMM d, yyyy')}</Item.Header>
                         
                       
                         <Item.Extra>
                             <Button onClick={()=>selectTermini(p.termini_ID)} floated="right" content='View' color='blue'/>
                            {!id && <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        name={p!.termini_ID}
                                       
                                        floated='right' 
                                        content='Delete' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Delete terminin' />
                                <Modal.Content>
                                    <p>
                                        Are you sure?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button color='green' onClick={() =>handleDelete(p!.termini_ID) }>
                                        <Icon name='checkmark' /> Yes
                                    
                                    </Button>
                                </Modal.Actions>
                            </Modal>}
                            
                         </Item.Extra>
                     </Item.Content>
                  
                     
                     </Item>
                     </Segment>
                   
                    
                   
                     
                    

                ))}
               
                </Grid.Column>
                <Grid.Column width={5}>
        { id && TerminetStore.selectedTermini &&  !TerminetStore.editmode &&<TerminetDetails />}
            { id &&TerminetStore.editmode &&<TerminatForm
            key={TerminetStore.selectedTermini && TerminetStore.selectedTermini.termini_ID|| 0}
            />}
         
        </Grid.Column>
            
       
        
        </Grid>
       
    )

}
)

