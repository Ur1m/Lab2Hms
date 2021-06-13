import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemGroup, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function LlojiShtratitList(){
    const {llojiShtratitStore} = useStore();
    const {deleteLlojiShtratit, llojiShtreterve, loading} = llojiShtratitStore;

    const [target, setTarget] = useState('');

    function handleLlojiShtratitDelete(e: SyntheticEvent<HTMLButtonElement>, llojiShtratit_id: string){
        setTarget(e.currentTarget.name);
        deleteLlojiShtratit(llojiShtratit_id);
    }
 
    return (
        <Segment>
            <Item.Group divided>
                {llojiShtreterve.map(ILlojiShtratit=>(
                    <Item key={ILlojiShtratit.llojiShtratit_id}>
                        <Item.Content>
                            <Item.Header>{ILlojiShtratit.emri}</Item.Header>
                            <Item.Description>
                                <div>{ILlojiShtratit.pershkrimi}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => llojiShtratitStore.selectLlojiShtratit(ILlojiShtratit.llojiShtratit_id)} floated='right' content='Shiko' color='blue'/>
                                <Button 
                                        name={ILlojiShtratit.llojiShtratit_id}
                                        loading={loading && target === ILlojiShtratit.llojiShtratit_id}
                                        onClick={(e) => handleLlojiShtratitDelete(e, ILlojiShtratit.llojiShtratit_id)} 
                                        floated='right' 
                                        content='Fshij' 
                                        color='red'
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})