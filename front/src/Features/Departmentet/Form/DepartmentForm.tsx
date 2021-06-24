import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { IDepartment } from '../../../app/models/IDepartment';

export default observer(function DepartmentForm() {
    const { departmentStore } = useStore();
    const { selectedDepartment, closeForm, createDepartment, updateDepartment, loading } = departmentStore;


    const initialState = selectedDepartment ?? {
        department_id: '',
        name: '',
        description: '',
        fotografia:''
    }

    const [Department, setDepartment] = useState(initialState);
    const [fotografia, setfotografia] = useState<any>();
    const validationSchema = Yup.object({
        name: Yup.string().required('Emri departamentit nuk mund te jete i zbrazet...')
    })

    const changefile=(event:any)=>{
     
        let v=event.target.files;
        let reader=new FileReader();
        reader.readAsDataURL(v[0]);
        reader.onload=(e)=>{
         setfotografia( e.target?.result);
        }
     }

    function handleFormSubmit(Department: IDepartment) {
        Department!.fotografia=fotografia;
        Department.department_id ? updateDepartment(Department) : createDepartment(Department);
    }

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={Department}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Shkruani emrin e departamentit...' />
                        <MyTextArea rows={3} name='description' placeholder='Shkruani pershkrimin e departamentit...' />
                        <input type='file' name='fotografia' id="image-id"onChange={changefile} />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
                        floated='right' positive type='submit' content='Shto' />
                        <Button onClick={closeForm} floated='right' type='button' content='Anulo' />   
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})