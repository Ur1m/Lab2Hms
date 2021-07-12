import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { IShtrat } from '../../../app/models/IShtrat';
import { ILlojiShtratit, ILlojiShtratitDropDown } from '../../../app/models/ILlojiShtratit';
import { statusishtratit } from '../../../app/FormElements/StatusiShtratitOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';

export default observer(function ShtratForm() {
    const { shtratStore } = useStore();
    const { selectedShtrat, closeForm, createShtrat, updateShtrat, getLlojiShtreterve , loading } = shtratStore;


    const initialState = selectedShtrat ?? {
        shtrat_id: '',
        nrShtratit: null,
        statusi: '',
        pershkrimi: '',
        llojiShtratit_id: '',
    }

    const [Shtrat, setShtrat] = useState(initialState);
    const validationSchema = Yup.object({
        pershkrimi: Yup.string().required('Pershkrimi shtratit nuk mund te jete i zbrazet...'),
        nrShtratit: Yup.number().required('Numri i shtratit nuk mund te jete i zbrazet...').nullable(),
        statusi: Yup.string().required('Selektoni statusin').nullable(),
        llojiShtratit_id: Yup.string().required('Zgjedh llojin e shtratit...').nullable()
    })

    let llojiShtreterve: ILlojiShtratit[] = [];
    let llojiShtreterveDropDown: ILlojiShtratitDropDown[] = [];

    function handleFormSubmit(Shtrat: IShtrat) {
        Shtrat.shtrat_id ? updateShtrat(Shtrat) : createShtrat(Shtrat);
    }

    getLlojiShtreterve().then(response => {
        response?.forEach(element => {
            llojiShtreterve.push(element);
        });
        for(var i = 0; i < llojiShtreterve.length;i++){
            
            var llojiShtratitDropDown: ILlojiShtratitDropDown = { text: llojiShtreterve[i].emri, key: llojiShtreterve[i].llojiShtratit_id, value: llojiShtreterve[i].llojiShtratit_id}
            llojiShtreterveDropDown.push(llojiShtratitDropDown);
        }
    })

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={Shtrat}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <label>Numri i shtrati: </label>
                        <MyTextInput type='number' name='nrshtratit' placeholder='Shkruani numrin e shtratit...' />
                        <label>Pershrkimi: </label>
                        <MyTextArea rows={3} name='pershkrimi' placeholder='Shkruani pershkrimin e shtratit...' />
                        <label>Lloji: </label>
                        <MySelectInput options={llojiShtreterveDropDown} placeholder='Zgjedhni llojin e shtratit...' name='llojiShtratit_id'></MySelectInput>
                        <label>Statusi:</label>
                        <MySelectInput options={statusishtratit} placeholder='Statusi' name='statusi' />
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