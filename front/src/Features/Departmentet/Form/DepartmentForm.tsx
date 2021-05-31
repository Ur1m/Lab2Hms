import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function DepartmentForm(){
    const {departmentStore} = useStore();
    const {selectedDepartment, closeForm, createDepartment, updateDepartment, loading} = departmentStore;


    const initialState = selectedDepartment ?? {
        department_id: '',
        name: '',
        description: ''
    }

    const [Department, setDepartment] = useState(initialState);

    function handleSubmit(){
        Department.department_id ? updateDepartment(Department) : createDepartment(Department);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setDepartment({...Department, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Shkruani emrin e departamentit...' value={Department.name} name='name' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Shkruani pershkrimin e departamentit...' value={Department.description} name='description' onChange={handleInputChange}/>
                <Button onClick={closeForm} floated='right' type='button' content='Anulo'/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
            </Form>
        </Segment>
    )
})