import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function LlojiShtratitList(){
    const {llojiShtratitStore} = useStore();
    const {deleteLlojiShtratit, llojiShtreterve, loading} = llojiShtratitStore;
    const [open, setOpen] = React.useState(false)

    const [target, setTarget] = useState('');

    function handleLlojiShtratitDelete(e: SyntheticEvent<HTMLButtonElement>, llojiShtratit_id: string){
        setTarget(e.currentTarget.name);
        deleteLlojiShtratit(llojiShtratit_id);
        setOpen(false);
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
                                <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        name={ILlojiShtratit.llojiShtratit_id}
                                        loading={loading && target === ILlojiShtratit.llojiShtratit_id}
                                        floated='right' 
                                        content='Fshij' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Fshij llojin e shtratit' />
                                <Modal.Content>
                                    <p>
                                        A jeni i/e sigurt qe deshironi te fshini?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> Jo
                                    </Button>
                                    <Button color='green' onClick={(e) => handleLlojiShtratitDelete(e, ILlojiShtratit.llojiShtratit_id)}>
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