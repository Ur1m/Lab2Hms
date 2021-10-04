import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Header,Label, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStorePacientat, useStorePaisjet, useStoreRaport, useStoreTherapies } from '../../app/stores/store';
import "./raport.css";

export default observer( function RaportList(){
    const {RaportStore} = useStoreRaport();
    const {selectedRaport, editmode,raporti} = RaportStore;
    const {PaisjetStore}=useStorePaisjet();
    const{paisjetRegistry}=PaisjetStore
    const [open, setOpen] = React.useState(false)
    const [search, setsearch] = useState("");
    const [target, setTarget] = useState('');
    useEffect(() => {
        RaportStore.loadRaportet();
        PaisjetStore.loadPaisjet();
    }, [RaportStore])

    
 
    return (
    <React.Fragment>
        <Item.Group>
            <div className="ui left icon input"><input type="text" placeholder="Kerko raportin" onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div>
        </Item.Group>
        <Segment className="sss">
            <Item.Group divided >
                {raporti.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.raporti.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map(raporti =>(
                    <Item key={raporti.raport_Id}>
                        <Item.Content >
                            <Item.Header>{paisjetRegistry.get(raporti.paisja_Id)?.emertimi}</Item.Header>
                            <Item.Description>
                                <div>{raporti.date}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => RaportStore.selectRaport(raporti.raport_Id)} floated='right' content='Shiko' color='blue'/>
                                <Button onClick={() => RaportStore.deleteRaport(raporti.raport_Id)} floated='right' content='delete' color='red'/>
                            
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
        </React.Fragment>
    )
})