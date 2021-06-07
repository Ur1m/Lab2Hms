import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { IFatura } from '../../../app/models/IFatura';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { statusi } from '../../../app/FormElements/StatusiOptions';

export default observer(function FaturaForm() {
    const { faturaStore } = useStore();
    const { selectedFatura, closeForm, createFatura, updateFatura, loading } = faturaStore;


    const initialState = selectedFatura ?? {
        fatura_id: '',
        titulli: '',
        pershkrimi: '',
        shuma: null,
        krijuarme: null,
        statusi: '',
        pacienti_id: ''
    }

    const [Fatura, setFatura] = useState(initialState);
    const validationSchema = Yup.object({
        titulli: Yup.string().required('Titulli fatures nuk mund te jete i zbrazet...'),
        shuma: Yup.number().required('Shuma fatures nuk mund te jete i zbrazet...').nullable(),
        krijuarme:Yup.string().required('Selektoni daten kur eshte krijuar fatura...').nullable(),
        statusi:Yup.string().required('Selektoni statusin').nullable(),
        pacienti:Yup.string().required('Zgjedh pacientin').nullable()
    })
    

    function handleFormSubmit(Fatura: IFatura) {
        Fatura.fatura_id ? updateFatura(Fatura) : createFatura(Fatura);
    }

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={Fatura}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='titulli' placeholder='Shkruani titullin e fatures...' />
                        <MyTextArea rows={3} name='pershkrimi' placeholder='Shkruani pershkrimin e fatures...' />
                        <MyTextInput name='shuma' placeholder='Shkruani shumen e fatures...' />
                        <MyDateInput name='krijuarme' placeholderText='Krijuar me...' />
                        <MySelectInput options={null} placeholder='Zgjedh pacientin...' name='pacienti'/>
                        <MySelectInput options={statusi} placeholder='Statusi' name='statusi'/>
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