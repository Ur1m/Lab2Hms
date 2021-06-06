import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item,Button,Label, Segment } from 'semantic-ui-react';
import agent from '../../app/api/agent';
import { IDoktori } from '../../app/Models/Doktori';

import doktoretStor from '../../app/store/doktoretStor';



interface IProps{
    Doktori: IDoktori[];
    selectDoktori:(Id: string) => void;
    deleteDoktor:(id:string)=>void;
    
}

export const DoktoratList : React.FC<IProps> = ({Doktori,selectDoktori,deleteDoktor}) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {Doktori.map(Doktori =>(
                     <Item key={Doktori.mjeku_Id}>
                     <Item.Content>
                         <Item.Header as='a'>{Doktori.emri}</Item.Header>
                         <Item.Description>
                             <div>{Doktori.mbimeri}</div>
                         </Item.Description>
                         <Item.Description>
                             <div>{Doktori.ditlindja}</div>
                         </Item.Description>
                         <Item.Extra>
                             <Button onClick={()=>selectDoktori(Doktori.mjeku_Id)} floated="right" content='View' color='blue'/>
                             <Button onClick={()=>deleteDoktor(Doktori.mjeku_Id)} floated="right" content='Delete' color='red'/>
                             <Label basic content={Doktori.depName}/>
                         </Item.Extra>
                     </Item.Content>
                     </Item>

                ))}
            
        </Item.Group>
        
        </Segment>
    )
}
