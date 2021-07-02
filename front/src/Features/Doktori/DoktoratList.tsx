
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Item,Button,Label, Segment } from 'semantic-ui-react';

import { IDoktori } from '../../app/models/Doktori';
import { useStoreDoktorat } from '../../app/stores/store';




export default observer(function DoktoratList () {
    const {DoktoratStore}=useStoreDoktorat();
    const{doktorat,selectDoktori,deleteDoktori,openForm}=DoktoratStore;
    
    const[search,setsearch]=useState("");
    useEffect(()=>{
        DoktoratStore.loadDoktorat();
    },[DoktoratStore]);
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
                             <Button onClick={()=>deleteDoktori(Doktori.mjeku_Id)} floated="right" content='Delete' color='red'/>
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
