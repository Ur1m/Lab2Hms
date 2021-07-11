import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header,Label, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function FaturaList(){
    const {faturaStore} = useStore();
    const {deleteFatura, Faturat, loading, selectedFatura, selectFatura} = faturaStore;
    const [open, setOpen] = React.useState(false)
    const [target, setTarget] = useState('');
    const [search, setsearch] = useState("");

    function handleFaturaDelete(e: SyntheticEvent<HTMLButtonElement>, fatura_id: string){
        setTarget(e.currentTarget.name);
        deleteFatura(fatura_id);
        setOpen(false);
    }

    function del(fatura_Id:string){
        selectFatura(fatura_Id);
        setOpen(true);
    }
 
    return (
    <React.Fragment>
        <Item.Group>
            <div className="ui left icon input"><input type="text" placeholder="Kerko fature..." onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div>
        </Item.Group>
        <Segment>
            <Item.Group divided>
                {Faturat.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.titulli.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map((IFatura,key)=>(
                    <Item key={key} value={IFatura.fatura_Id}>
                        <Item.Content>
                            <Item.Header>{IFatura.titulli}</Item.Header>
                            <Item.Description>
                                <div>{IFatura.pershkrimi}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => faturaStore.selectFatura(IFatura.fatura_Id)} floated='right' content='Shiko' color='blue'/>
                                <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button  
                                        onClick={()=>del(IFatura.fatura_Id)}
                                        name={IFatura.fatura_Id}
                                        loading={loading && target === IFatura.fatura_Id}
                                        floated='right' 
                                        content='Fshij' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Fshij faturen' />
                                <Modal.Content>
                                    <p>
                                        A jeni i/e sigurt qe deshironi te fshini Faturen: {selectedFatura?.titulli}?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> Jo
                                    </Button>
                                    <Button color='green' onClick={(e) => handleFaturaDelete(e, selectedFatura!.fatura_Id)}>
                                        <Icon name='checkmark' /> Po
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            <Label basic content={IFatura.pacient?.emri + " " + IFatura.pacient?.mbimeri}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
        </React.Fragment>
    )
})