
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Item,Button,Label, Segment } from 'semantic-ui-react';

import { IDoktori } from '../../app/models/Doktori';
import { useStoreDoktorat } from '../../app/stores/store';




export default observer(function DoktoratList () {
    const {DoktoratStore}=useStoreDoktorat();
    const{doktorat,selectDoktori,deleteDoktori}=DoktoratStore;
    
    useEffect(()=>{
        DoktoratStore.loadDoktorat();
    },[DoktoratStore]);
    return (
        <Segment clearing>
            <Item.Group divided>
                {doktorat.map(Doktori =>(
                     <Item key={Doktori.mjeku_Id}>
                     <Item.Content>
                         <Item.Header as='a'>{Doktori.emri}</Item.Header>
                         <Item.Description>
                             <div>{Doktori.mbimeri}</div>
                         </Item.Description>
                       
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
    )
}
)
