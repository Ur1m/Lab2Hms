import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStorePaisjet } from "../../app/stores/store";

export default observer( function PacientatList () {
    const {PaisjetStore}=useStorePaisjet();
    const{paisjet,selectPaisja,openForm,selectedPaisja}=PaisjetStore;

    useEffect(()=>{
        PaisjetStore.loadPaisjet();
    },[PaisjetStore]);
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
                             <Button onClick={()=>PaisjetStore.deletePaisja(p.paisja_Id)} floated="right" content='Delete' color='red'/>
                            
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
