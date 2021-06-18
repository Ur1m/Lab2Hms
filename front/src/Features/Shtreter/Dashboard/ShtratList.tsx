import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function ShtratList(){
    const {shtratStore} = useStore();
    const {deleteShtrat, Shtreter, loading} = shtratStore;
    const [open, setOpen] = React.useState(false)

    const [target, setTarget] = useState('');

    function handleShtratDelete(e: SyntheticEvent<HTMLButtonElement>, shtrat_id: string){
        setTarget(e.currentTarget.name);
        deleteShtrat(shtrat_id);
        setOpen(false);
    }
 
    return (
        <Segment>
            <Item.Group divided>
                {Shtreter.map(IShtrat =>(
                    <Item key={IShtrat.shtrat_id}>
                        <Item.Content>
                            <Item.Header>{IShtrat.nrshtratit}</Item.Header>
                            <Item.Description>
                                <div>{IShtrat.pershkrimi}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => shtratStore.selectShtrat(IShtrat.shtrat_id)} floated='right' content='Shiko' color='blue'/>
                                <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        name={IShtrat.shtrat_id}
                                        loading={loading && target === IShtrat.shtrat_id}
                                        floated='right' 
                                        content='Fshij' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Fshij shtratin' />
                                <Modal.Content>
                                    <p>
                                        A jeni i/e sigurt qe deshironi te fshini?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> Jo
                                    </Button>
                                    <Button color='green' onClick={(e) => handleShtratDelete(e, IShtrat.shtrat_id)}>
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