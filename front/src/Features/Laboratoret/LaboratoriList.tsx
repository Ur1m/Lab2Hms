import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Header,Label, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { departamentet } from '../../app/FormElements/DoktoriOptions';
import { useStoreDepartment, useStoreLaboratori, useStorePacientat, useStorePaisjet, useStoreRaport, useStoreTherapies } from '../../app/stores/store';


export default observer( function LaboratoriList(){
    const {LaboratoriStore} = useStoreLaboratori();
    const {selectLaboratori, editMode,Laboratoret} = LaboratoriStore;
    const {DepartmentStore}=useStoreDepartment();
    const{Departmentet}=DepartmentStore
    const [open, setOpen] = React.useState(false)
    const [search, setsearch] = useState("");
    const [target, setTarget] = useState('');
    useEffect(() => {
        LaboratoriStore.loadLaboratoret();
        DepartmentStore.loadDepartamentet();
    }, [LaboratoriStore])

    
 
    return (
    <React.Fragment>
        <Item.Group>
            <div className="ui left icon input"><input type="text" placeholder="Kerko raportin ne baze te paisjes" onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div>
        </Item.Group>
        <Segment className="sss">
            <Item.Group divided >
                {Laboratoret.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.emri.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map(ILaboratori =>(
                    <Item key={ILaboratori.lab_Id}>
                        <Item.Content >
                        <Item.Header>
                                    {ILaboratori.emri}</Item.Header>
                              
                            <Item.Description>
                             
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => LaboratoriStore.selectLaboratori(ILaboratori.lab_Id)} floated='right' content='Shiko' color='blue'/>
                                <Button onClick={() => LaboratoriStore.deleteLaborator(ILaboratori.lab_Id)} floated='right' content='delete' color='red'/>
                            
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
        </React.Fragment>
    )
})