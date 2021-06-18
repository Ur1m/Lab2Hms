import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function CaktoShtratinList(){
    const {caktoShtratinStore} = useStore();
    const {deleteCaktoShtratin, caktoShtreterit, loading} = caktoShtratinStore;
    const [open, setOpen] = React.useState(false)

    const [target, setTarget] = useState('');

    function handleCaktoShtratinDelete(e: SyntheticEvent<HTMLButtonElement>, caktoShtratin_id: string){
        setTarget(e.currentTarget.name);
        deleteCaktoShtratin(caktoShtratin_id);
        setOpen(false);
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
                                <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        name={ICaktoShtratin.caktoshtratin_id}
                                        loading={loading && target === ICaktoShtratin.caktoshtratin_id}
                                        floated='right' 
                                        content='Fshij' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Fshij shtratin e caktuar' />
                                <Modal.Content>
                                    <p>
                                        A jeni i/e sigurt qe deshironi te fshini?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> Jo
                                    </Button>
                                    <Button color='green' onClick={(e) => handleCaktoShtratinDelete(e, ICaktoShtratin.caktoshtratin_id)}>
                                        <Icon name='checkmark' /> Po
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})