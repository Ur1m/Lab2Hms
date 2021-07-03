import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { useEffect } from 'react';
import { Button, Header, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import DepartmentStore from '../../../app/stores/departmentStore';
import { useStore } from '../../../app/stores/store';

export default observer(function DepartmentList() {
    const { departmentStore } = useStore();
    const { deleteDepartment, Departmentet, selectedDepartment, selectDepartment ,loading } = departmentStore;
    const [open, setOpen] = React.useState(false)

    const [target, setTarget] = useState('');

    const [search, setsearch] = useState("");

    function handleDepartmentDelete(e: SyntheticEvent<HTMLButtonElement>, department_id: string) {
        setTarget(e.currentTarget.name);
        deleteDepartment(department_id);
        setOpen(false);
    }

    function del(department_id:string){
        selectDepartment(department_id);
        setOpen(true);
    }


    return (
        <React.Fragment>
            <Item.Group>
                <div className="ui left icon input"><input type="text" placeholder="Kerko departamentet..." onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div>
            </Item.Group>
            <Segment>
                <Item.Group divided>
                    {Departmentet.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map(IDepartment => (
                        <Item key={IDepartment.department_id}>
                            <Item.Content>
                                <Item.Header>{IDepartment.name}</Item.Header>
                                <Item.Description>
                                    <div>{IDepartment.description}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => departmentStore.selectDepartment(IDepartment.department_id)} floated='right' content='Shiko' color='blue' />
                                    <Button onClick={()=>del(IDepartment.department_id)} floated="right" content='Fshij' color='red'/>
                                    <Modal
                                        closeIcon
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        onOpen={() => setOpen(true)}>
                                        <Header icon='archive' content='Fshij departamentin' />
                                        <Modal.Content>
                                            <p>
                                                A jeni i/e sigurt qe deshironi te fshini Departamentin: {selectedDepartment?.name}?
                                            </p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='red' onClick={() => setOpen(false)}>
                                                <Icon name='remove' /> Jo
                                            </Button>
                                            <Button color='green' onClick={(e) => handleDepartmentDelete(e, selectedDepartment!.department_id)}>
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