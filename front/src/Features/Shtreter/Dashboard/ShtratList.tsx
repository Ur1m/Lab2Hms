import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header,Label, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import "./shtrat.css";

export default observer( function ShtratList(){
    const {shtratStore} = useStore();
    const {deleteShtrat, Shtrat, loading, selectShtrat, selectedShtrat} = shtratStore;
    const [open, setOpen] = React.useState(false)
    const [search, setsearch] = useState("");
    const [target, setTarget] = useState('');

    function handleShtratDelete(e: SyntheticEvent<HTMLButtonElement>, shtrat_id: string){
        setTarget(e.currentTarget.name);
        deleteShtrat(shtrat_id);
        setOpen(false);
    }
 
    function del(shtrat_id:string){
        selectShtrat(shtrat_id);
        setOpen(true);
    }

    return (
        <React.Fragment>
            <Item.Group>
                <div className="ui left icon input"><input type="text" placeholder="Kerko Shtrat (Statusi)..." onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div>
            </Item.Group>
        <Segment className="sss">
            <Item.Group divided>
                {Shtrat.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.statusi.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map(IShtrat =>(
                    <Item key={IShtrat.shtrat_id}>
                        <Item.Content>
                            <Item.Header>Numri i shtratit: {IShtrat.nrShtratit}</Item.Header>
                            <Item.Description>
                                <div>Pershkrimi: {IShtrat.pershkrimi}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => shtratStore.selectShtrat(IShtrat.shtrat_id)} floated='right' content='Shiko' color='blue'/>
                                <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        onClick={()=>del(IShtrat.shtrat_id)} 
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
                            
                            <Label basic content={IShtrat.statusi}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
        </React.Fragment>
    )
})