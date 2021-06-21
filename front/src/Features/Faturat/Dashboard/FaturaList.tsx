import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function FaturaList(){
    const {faturaStore} = useStore();
    const {deleteFatura, Faturat, loading} = faturaStore;
    const [open, setOpen] = React.useState(false)

    const [target, setTarget] = useState('');

    function handleFaturaDelete(e: SyntheticEvent<HTMLButtonElement>, fatura_id: string){
        setTarget(e.currentTarget.name);
        deleteFatura(fatura_id);
        setOpen(false);
    }
 
    return (
        <Segment>
            <Item.Group divided>
                {Faturat.map((IFatura,key)=>(
                    <Item key={key} value={IFatura.fatura_id}>
                        <Item.Content>
                            <Item.Header>{IFatura.titulli}</Item.Header>
                            <Item.Description>
                                <div>{IFatura.pershkrimi}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => faturaStore.selectFatura(IFatura.fatura_id)} floated='right' content='Shiko' color='blue'/>
                                <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        name={IFatura.fatura_id}
                                        loading={loading && target === IFatura.fatura_id}
                                        floated='right' 
                                        content='Fshij' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Fshij faturen' />
                                <Modal.Content>
                                    <p>
                                        A jeni i/e sigurt qe deshironi te fshini?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> Jo
                                    </Button>
                                    <Button color='green' onClick={(e) => handleFaturaDelete(e, IFatura.fatura_id)}>
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