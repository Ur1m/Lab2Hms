import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemGroup, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function ShtratList(){
    const {shtratStore} = useStore();
    const {deleteShtrat, Shtreter, loading} = shtratStore;

    const [target, setTarget] = useState('');

    function handleShtratDelete(e: SyntheticEvent<HTMLButtonElement>, shtrat_id: string){
        setTarget(e.currentTarget.name);
        deleteShtrat(shtrat_id);
    }
 
    return (
        <Segment>
            <Item.Group divided>
                {Shtreter.map((IShtrat,key)=>(
                    <Item key={key} value={IShtrat.shtrat_id}>
                        <Item.Content>
                            <Item.Header>{IShtrat.nrshtratit}</Item.Header>
                            <Item.Description>
                                <div>{IShtrat.pershkrimi}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => shtratStore.selectShtrat(IShtrat.shtrat_id)} floated='right' content='Shiko' color='blue'/>
                                <Button 
                                        name={IShtrat.shtrat_id}
                                        loading={loading && target === IShtrat.shtrat_id}
                                        onClick={(e) => handleShtratDelete(e, IShtrat.shtrat_id)} 
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