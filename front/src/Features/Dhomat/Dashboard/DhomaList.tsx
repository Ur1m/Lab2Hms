import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header,Label, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function DhomaList(){
    const {dhomaStore} = useStore();
    const {deleteDhoma, Dhomat, loading} = dhomaStore;
    const [open, setOpen] = React.useState(false)
    const [search, setsearch] = useState("");
    const [target, setTarget] = useState('');

    function handleDhomaDelete(e: SyntheticEvent<HTMLButtonElement>, dhoma_id: string){
        setTarget(e.currentTarget.name);
        deleteDhoma(dhoma_id);
        setOpen(false);
    }
 
    return (
    <React.Fragment>
        <Item.Group>
            <div className="ui left icon input"><input type="text" placeholder="Kerko dhome (Lloji)..." onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div>
        </Item.Group>
        <Segment>
            <Item.Group divided>
                {Dhomat.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.llojiDhomes.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map(IDhoma =>(
                    <Item key={IDhoma.dhoma_Id}>
                        <Item.Content>
                            <Item.Header>Numri i dhomes:  {IDhoma.nrDhomes}</Item.Header>
                            <Item.Description>
                                <div>{IDhoma.pershkrimi}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => dhomaStore.selectDhoma(IDhoma.dhoma_Id)} floated='right' content='Shiko' color='blue'/>
                                <Button onClick={() => dhomaStore.selectDhoma(IDhoma.dhoma_Id)} floated='right' content='Cakto Shtreterit ne Dhoma' color='yellow'/>
                                <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        name={IDhoma.dhoma_Id}
                                        loading={loading && target === IDhoma.dhoma_Id}
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
                                    <Button color='green' onClick={(e) => handleDhomaDelete(e, IDhoma.dhoma_Id)}>
                                        <Icon name='checkmark' /> Po
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            <Label basic content={IDhoma.llojiDhomes}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
        </React.Fragment>
    )
})