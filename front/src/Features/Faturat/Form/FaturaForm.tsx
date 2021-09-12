import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import { useStore, useStoreFaturat } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { IFatura } from '../../../app/models/IFatura';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { statusi } from '../../../app/FormElements/StatusiOptions';
import { IPacientetDropDown, IPacienti } from '../../../app/models/IPacienti';
import "../Dashboard/fatura.css";

export default observer(function FaturaForm() {
    const { FaturatStore } = useStoreFaturat();
    const { selectedFatura, closeForm, createFatura, updateFatura, loading, getPacientet } = FaturatStore;

    const initialState = selectedFatura ?? {
        fatura_Id: '',
        titulli: '',
        pershkrimi: '',
        shuma: null,
        krijuarme: null,
        statusi: '',
        pacient_id: '',
    }

    const [Fatura, setFatura] = useState(initialState);
    const validationSchema = Yup.object({
        titulli: Yup.string().matches(/^[a-zA-Z0-9]{3,12}$/, 'titulli duhet te kete mbi 3 shkronja deri ne 12').required('Titulli fatures nuk mund te jete i zbrazet...'),
        shuma: Yup.number().required('Shuma fatures nuk mund te jete i zbrazet...').nullable(),
        krijuarme: Yup.string().required('Selektoni daten kur eshte krijuar fatura...').nullable(),
        statusi: Yup.string().required('Selektoni statusin').nullable(),
        pacient_id: Yup.string().required('Zgjedh pacientin').nullable(),
    })

    let pacientet: IPacienti[] = [];
    let pacientetDropDown: IPacientetDropDown[] = [];


    function handleFormSubmit(Fatura: IFatura) {
        Fatura.fatura_Id ? updateFatura(Fatura) : createFatura(Fatura);
    }


    getPacientet()?.then(response => {
        response?.forEach(element => {
            pacientet.push(element);
        });
        for (var i = 0; i < pacientet.length; i++) {

            var pacientiDropDown: IPacientetDropDown = { text: pacientet[i].emri + " " + pacientet[i].mbimeri, key: pacientet[i].pacient_Id, value: pacientet[i].pacient_Id }
            pacientetDropDown.push(pacientiDropDown);
        }
    })


    return (
        <Segment className="ssss" clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={Fatura}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <label>Emri: </label>
                        <MyTextInput name='titulli' placeholder='Shkruani titullin e fatures...' />
                        <label>Pershkrimi: </label>
                        <MyTextArea rows={3} name='pershkrimi' placeholder='Shkruani pershkrimin e fatures...' />
                        <label>Shuma: </label>
                        <MyTextInput type='number' name='shuma' placeholder='Shkruani shumen e fatures...' />
                        <label>Data: </label>
                        <MyDateInput name='krijuarme' placeholderText='Krijuar me...' maxDate={new Date()}
                            minDate={new Date('05/05/1922')} />
                        <label>Pacienti: </label>
                        <MySelectInput options={pacientetDropDown} placeholder='Zgjedhni pacientin...' name='pacient_id'></MySelectInput>
                        <label>Statusi: </label>
                        <MySelectInput options={statusi} placeholder='Statusi' name='statusi' />
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