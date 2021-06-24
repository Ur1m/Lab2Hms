import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function DhomaList(){
    const {dhomaStore} = useStore();
    const {deleteDhoma, Dhomat, loading} = dhomaStore;
    const [open, setOpen] = React.useState(false)

    const [target, setTarget] = useState('');

    function handleDhomaDelete(e: SyntheticEvent<HTMLButtonElement>, dhoma_id: string){
        setTarget(e.currentTarget.name);
        deleteDhoma(dhoma_id);
        setOpen(false);
    }
 
    return (
        <Segment>
            <Item.Group divided>
                {Dhomat.map(IDhoma =>(
                    <Item key={IDhoma.dhoma_id}>
                        <Item.Content>
                            <Item.Header>{IDhoma.dhoma_id}</Item.Header>
                            <Item.Description>
                                <div>{IDhoma.pershkrimi}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => dhomaStore.selectDhoma(IDhoma.dhoma_id)} floated='right' content='Shiko' color='blue'/>
                                <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        name={IDhoma.dhoma_id}
                                        loading={loading && target === IDhoma.dhoma_id}
                                        floated='right' 
                                        content='Fshij' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Fshij dhomen' />
                                <Modal.Content>
                                    <p>
                                        A jeni i/e sigurt qe deshironi te fshini?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> Jo
                                    </Button>
                                    <Button color='green' onClick={(e) => handleDhomaDelete(e, IDhoma.dhoma_id)}>
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