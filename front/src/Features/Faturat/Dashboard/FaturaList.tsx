import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemGroup, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function FaturaList(){
    const {faturaStore} = useStore();
    const {deleteFatura, Faturat, loading} = faturaStore;

    const [target, setTarget] = useState('');

    function handleFaturaDelete(e: SyntheticEvent<HTMLButtonElement>, fatura_id: string){
        setTarget(e.currentTarget.name);
        deleteFatura(fatura_id);
    }
 
    return (
        <Segment>
            <Item.Group divided>
                {Faturat.map(IFatura =>(
                    <Item key={IFatura.fatura_id}>
                        <Item.Content>
                            <Item.Header>{IFatura.titulli}</Item.Header>
                            <Item.Description>
                                <div>{IFatura.pershkrimi}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => faturaStore.selectFatura(IFatura.fatura_id)} floated='right' content='Shiko' color='blue'/>
                                <Button 
                                        name={IFatura.fatura_id}
                                        loading={loading && target === IFatura.fatura_id}
                                        onClick={(e) => handleFaturaDelete(e, IFatura.fatura_id)} 
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