import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header,Label, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function CaktoShtratinList(){
    const {caktoShtratinStore} = useStore();
    const {deleteCaktoShtratin, caktoShtreterit, loading, selectCaktoShtratin, selectedCaktoShtratin} = caktoShtratinStore;
    const [open, setOpen] = React.useState(false)
    const [search, setsearch] = useState("");
    const [target, setTarget] = useState('');

    function handleCaktoShtratinDelete(e: SyntheticEvent<HTMLButtonElement>, caktoShtratin_id: string){
        setTarget(e.currentTarget.name);
        deleteCaktoShtratin(caktoShtratin_id);
        setOpen(false);
    }

    function del(caktoShtratin_id:string){
        selectCaktoShtratin(caktoShtratin_id);
        setOpen(true);
    }
 
    return (
        <React.Fragment>
            <Item.Group>
                <div className="ui left icon input"><input type="text" placeholder="Kerko shtrat per pacient..." onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div>
            </Item.Group>
        <Segment>
            <Item.Group divided>
                {caktoShtreterit.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.pacient?.emri.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map((ICaktoShtratin,key)=>(
                    <Item key={key} value={ICaktoShtratin.caktoShtratin_id}>
                        <Item.Content>
                            <Item.Header>Numri shtratit: {ICaktoShtratin.shtrat?.nrShtratit}</Item.Header>
                            <Item.Description>
                                <div>
                                <label>Pacienti: </label>
                                {ICaktoShtratin.pacient?.emri + " " + ICaktoShtratin.pacient?.mbimeri}
                                </div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => caktoShtratinStore.selectCaktoShtratin(ICaktoShtratin.caktoShtratin_id)} floated='right' content='Shiko' color='blue'/>
                                <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        onClick={()=>del(ICaktoShtratin.caktoShtratin_id)}
                                        name={ICaktoShtratin.caktoShtratin_id}
                                        loading={loading && target === ICaktoShtratin.caktoShtratin_id}
                                        floated='right' 
                                        content='Fshij' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Fshij shtratin e caktuar' />
                                <Modal.Content>
                                    <p>
                                        A jeni i/e sigurt qe deshironi te fshini ?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> Jo
                                    </Button>
                                    <Button color='green' onClick={(e) => handleCaktoShtratinDelete(e, selectedCaktoShtratin!.caktoShtratin_id)}>
                                        <Icon name='checkmark' /> Po
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            <Label basic content={ICaktoShtratin.shtrat?.llojiShtratit?.emri}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
        </React.Fragment>
    )
})