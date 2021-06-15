import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemGroup, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function CaktoShtratinList(){
    const {caktoShtratinStore} = useStore();
    const {deleteCaktoShtratin, caktoShtreterit, loading} = caktoShtratinStore;

    const [target, setTarget] = useState('');

    function handleCaktoShtratinDelete(e: SyntheticEvent<HTMLButtonElement>, caktoShtratin_id: string){
        setTarget(e.currentTarget.name);
        deleteCaktoShtratin(caktoShtratin_id);
    }
 
    return (
        <Segment>
            <Item.Group divided>
                {caktoShtreterit.map((ICaktoShtratin,key)=>(
                    <Item key={key} value={ICaktoShtratin.caktoshtratin_id}>
                        <Item.Content>
                            <Item.Header>{ICaktoShtratin.pacient_id}</Item.Header>
                            <Item.Description>
                                <div>{ICaktoShtratin.shtrat_id}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => caktoShtratinStore.selectCaktoShtratin(ICaktoShtratin.caktoshtratin_id)} floated='right' content='Shiko' color='blue'/>
                                <Button 
                                        name={ICaktoShtratin.caktoshtratin_id}
                                        loading={loading && target === ICaktoShtratin.caktoshtratin_id}
                                        onClick={(e) => handleCaktoShtratinDelete(e, ICaktoShtratin.caktoshtratin_id)} 
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