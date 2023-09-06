import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function DepartmentDetails() {
    const {departmentStore} = useStore();
    const {selectedDepartment: Department, openForm, cancelSelectedDepartment} = departmentStore;

    if(!Department) return <LoadingComponent />;

    return (
        <Card fluid>
        <Image src={`${Department.fotografia}`} />
        <Card.Content>
          <Card.Header>{Department.name}</Card.Header>
          <Card.Description>
                {Department.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button onClick={() => openForm(Department.department_id)} basic color='blue' content='Ndrysho'/>
                <Button onClick={cancelSelectedDepartment} basic color='blue' content='Anulo'/>
            </Button.Group>
        </Card.Content>
      </Card >
    )
}