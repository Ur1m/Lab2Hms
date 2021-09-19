import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Header,Label, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStorePacientat, useStorePaisjet, useStoreTherapies } from '../../app/stores/store';


export default observer( function TherapyList(){
    const {TherapyStore} = useStoreTherapies();
    const {selectedTherapy, editmode,terapit} = TherapyStore;
    const {PacientatStore}=useStorePacientat();
    const{pacientatRegistry}=PacientatStore
    const [open, setOpen] = React.useState(false)
    const [search, setsearch] = useState("");
    const [target, setTarget] = useState('');
    useEffect(() => {
        TherapyStore.loadTerapit();
        PacientatStore.loadPacientat();
    }, [TherapyStore])

    
 
    return (
    <React.Fragment>
        <Item.Group>
            <div className="ui left icon input"><input type="text" placeholder="Kerko Terapine..." onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div>
        </Item.Group>
        <Segment className="sss">
            <Item.Group divided>
                {terapit.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.onGoing.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map(terapia =>(
                    <Item key={terapia.therapy_Id}>
                        <Item.Content>
                            <Item.Header>{pacientatRegistry.get(terapia.pacient_id)?.emri}</Item.Header>
                            <Item.Description>
                                <div>{terapia.onGoing}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => TherapyStore.selectTerapin(terapia.therapy_Id)} floated='right' content='Shiko' color='blue'/>
                                <Button onClick={() => TherapyStore.deleteTherapy(terapia.therapy_Id)} floated='right' content='delete' color='red'/>
                            
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
        </React.Fragment>
    )
})