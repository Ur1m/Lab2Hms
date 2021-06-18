import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Header, Icon, Item, ItemGroup, Modal, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function DepartmentList(){
    const {departmentStore} = useStore();
    const {deleteDepartment, Departmentet, loading} = departmentStore;
    const [open, setOpen] = React.useState(false)

    const [target, setTarget] = useState('');

    function handleDepartmentDelete(e: SyntheticEvent<HTMLButtonElement>, department_id: string){
        setTarget(e.currentTarget.name);
        deleteDepartment(department_id);
        setOpen(false);
    }
 
    return (
        <Segment>
            <Item.Group divided>
                {Departmentet.map(IDepartment =>(
                    <Item key={IDepartment.department_id}>
                        <Item.Content>
                            <Item.Header>{IDepartment.name}</Item.Header>
                            <Item.Description>
                                <div>{IDepartment.description}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => departmentStore.selectDepartment(IDepartment.department_id)} floated='right' content='Shiko' color='blue'/>
                                <Modal
                                closeIcon
                                open={open}
                                trigger={
                                <Button 
                                        name={IDepartment.department_id}
                                        loading={loading && target === IDepartment.department_id}
                                        floated='right' 
                                        content='Fshij' 
                                        color='red'
                                />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Fshij departamentin' />
                                <Modal.Content>
                                    <p>
                                        A jeni i/e sigurt qe deshironi te fshini?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> Jo
                                    </Button>
                                    <Button color='green' onClick={(e) => handleDepartmentDelete(e, IDepartment.department_id)}>
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
    )
})