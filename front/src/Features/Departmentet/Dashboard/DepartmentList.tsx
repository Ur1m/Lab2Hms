import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemGroup, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function DepartmentList(){
    const {departmentStore} = useStore();
    const {deleteDepartment, Departmentet, loading} = departmentStore;

    const [target, setTarget] = useState('');

    function handleDepartmentDelete(e: SyntheticEvent<HTMLButtonElement>, department_id: string){
        setTarget(e.currentTarget.name);
        deleteDepartment(department_id);
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
                                <Button 
                                        name={IDepartment.department_id}
                                        loading={loading && target === IDepartment.department_id}
                                        onClick={(e) => handleDepartmentDelete(e, IDepartment.department_id)} 
                                        floated='right' 
                                        content='Fshij' 
                                        color='red'
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})