import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { Button, Grid, Item, Segment } from "semantic-ui-react";
import { useStoreTerminet } from "../../app/stores/store";
import { TerminatForm } from "./TerminatForm";
import TerminetDetails from "./TerminetDetails";


export default observer( function TerminetList () {
    const {TerminetStore}=useStoreTerminet();
    const{terminet,selectTermini,openForm}=TerminetStore;
    const {id}=useParams<{id:string}>();
    var i=0;
    

    useEffect(()=>{
        TerminetStore.loadTerminet();
    },[TerminetStore]);
    return (
     <Grid>
         <Grid.Column width={10}>
            <Item.Group>
          
           {!id && <Button onClick={()=>openForm()}floated="right"  positive content='AddTerminet'/>}
            </Item.Group>
          
              
            
                {terminet.filter(val=>{
                   if(id && val.pacient_Id==id || val.mjeku_Id==id){
                       return val;
                   }
                   else{
                       return val;
                   }
                   
                }).map(p =>
                    (
                   
                       
                        <Segment clearing>  
                     <Item key={p.termini_ID}>
                     <Item.Content>
                         <Item.Header as='a'>{"Dita: "+p.orari?.getDate()+" Muaji: "+p.orari?.getMonth()}</Item.Header>
                         
                       
                         <Item.Extra>
                             <Button onClick={()=>selectTermini(p.termini_ID)} floated="right" content='View' color='blue'/>
                            {!id && <Button onClick={()=>TerminetStore.deleteTermini(p.termini_ID)} floated="right" content='Delete' color='red'/>}
                            
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
