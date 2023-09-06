import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Header,Label, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { departamentet } from '../../app/FormElements/DoktoriOptions';
import { useStoreDepartment, useStoreLaboratori, useStorePacientat, useStorePaisjet, useStoreRaport, useStoreTherapies } from '../../app/stores/store';


export default observer( function LaboratoriList(){
    const {LaboratoriStore} = useStoreLaboratori();
    const {selectLaboratori,selectedLaborator, editMode,deleteLaborator,Laboratort,loading} = LaboratoriStore;
    const {DepartmentStore}=useStoreDepartment();
    const{Departmentet}=DepartmentStore
    const [open, setOpen] = React.useState(false)
    const [search, setsearch] = useState("");
    const [target, setTarget] = useState('');
    useEffect(() => {
        LaboratoriStore.loadLaboratoret();
        DepartmentStore.loadDepartamentet();
    }, [LaboratoriStore])

    function handleLaboratorDelete(e: SyntheticEvent<HTMLButtonElement>, lab_Id: string) {
        setTarget(e.currentTarget.name);
        deleteLaborator(lab_Id);
        setOpen(false);
    }
    function del(lab_Id:string){
        selectLaboratori(lab_Id);
        setOpen(true);
    }
    return (
    <React.Fragment>
        <Item.Group>
            <div className="ui left icon input"><input type="text" placeholder="Kerko raportin ne baze te paisjes" onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div>
        </Item.Group>
        <Segment className="sss">
            <Item.Group divided >
                {Laboratort.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.emri.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map(ILaboratori =>(
                    <Item key={ILaboratori.lab_Id}>
                         <Item.Content>
                                <Item.Header>
                                    {ILaboratori.emri}</Item.Header>
                                <Item.Description>
                                    <div>{ILaboratori.pershkrimi}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => LaboratoriStore.selectLaboratori(ILaboratori.lab_Id)} floated='right' content='Shiko' color='blue' />
                                    <Button 
                                    onClick={()=>del(ILaboratori.lab_Id)} 
                                    loading={loading && target === ILaboratori.lab_Id}
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
                                                A jeni i/e sigurt qe deshironi te fshini Laboratorin: {selectedLaborator?.emri}?
                                            </p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='red' onClick={() => setOpen(false)}>
                                                <Icon name='remove' /> Jo
                                            </Button>
                                            <Button color='green' onClick={(e) => handleLaboratorDelete(e, selectedLaborator!.lab_Id)}>
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