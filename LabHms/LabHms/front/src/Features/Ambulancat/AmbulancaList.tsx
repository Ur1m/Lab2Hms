import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Header,Label, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { departamentet } from '../../app/FormElements/DoktoriOptions';
import { useStoreAmbulancat, useStoreDepartment, useStoreLaboratori, useStorePacientat, useStorePaisjet, useStoreRaport, useStoreTherapies } from '../../app/stores/store';


export default observer( function AmbulancaList(){
    const {AmbulancaStore} = useStoreAmbulancat();
    const {selectAmbulancat,selectedAmbulanca, editMode,deleteAmbulancat,Ambulancat,loading} = AmbulancaStore;
    const {DepartmentStore}=useStoreDepartment();
    const{Departmentet}=DepartmentStore
    const [open, setOpen] = React.useState(false)
    const [search, setsearch] = useState("");
    const [target, setTarget] = useState('');
    useEffect(() => {
        AmbulancaStore.loadAmbulancat();
        DepartmentStore.loadDepartamentet();
    }, [AmbulancaStore])

    function handleAmbulancaDelete(e: SyntheticEvent<HTMLButtonElement>, amb_Id: string) {
        setTarget(e.currentTarget.name);
        deleteAmbulancat(amb_Id);
        setOpen(false);
    }
    function del(amb_Id:string){
        selectAmbulancat(amb_Id);
        setOpen(true);
    }
    return (
    <React.Fragment>
        <Item.Group>
            <div className="ui left icon input"><input type="text" placeholder="Kerko ambulancen ne baze te departamentit" onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div>
        </Item.Group>
        <Segment className="sss">
            <Item.Group divided >
                {Ambulancat.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.tipi.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map(IAmbulanca =>(
                    <Item key={IAmbulanca.amb_Id}>
                         <Item.Content>
                                <Item.Header>
                                    {IAmbulanca.tipi}</Item.Header>
                                <Item.Extra>
                                    <Button onClick={() => AmbulancaStore.selectAmbulancat(IAmbulanca.amb_Id)} floated='right' content='Shiko' color='blue' />
                                    <Button 
                                    onClick={()=>del(IAmbulanca.amb_Id)} 
                                    loading={loading && target === IAmbulanca.amb_Id}
                                    floated="right" 
                                    content='Fshij' 
                                    color='red'/>
                                    <Modal
                                        closeIcon
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        onOpen={() => setOpen(true)}>
                                        <Header icon='archive' content='Fshij departamentin' />
                                        <Modal.Content>
                                            <p>
                                                A jeni i/e sigurt qe deshironi te fshini Ambulancen: {selectedAmbulanca?.tipi}?
                                            </p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='red' onClick={() => setOpen(false)}>
                                                <Icon name='remove' /> Jo
                                            </Button>
                                            <Button color='green' onClick={(e) => handleAmbulancaDelete(e, selectedAmbulanca!.amb_Id)}>
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
        </React.Fragment>
    )
})