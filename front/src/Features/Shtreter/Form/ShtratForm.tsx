import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { IDepartment } from '../../../app/models/IDepartment';
import { IShtrat } from '../../../app/models/IShtrat';

export default observer(function ShtratForm() {
    const { shtratStore } = useStore();
    const { selectedShtrat, closeForm, createShtrat, updateShtrat, loading } = shtratStore;


    const initialState = selectedShtrat ?? {
        shtrat_id: '',
        nrshtratit: null,
        statusi: '',
        pershkrimi: '',
        llojiShtratit_id: ''
    }

    const [Shtrat, setShtrat] = useState(initialState);
    const validationSchema = Yup.object({
        name: Yup.string().required('Emri departamentit nuk mund te jete i zbrazet...')
    })

    function handleFormSubmit(Shtrat: IShtrat) {
        Shtrat.shtrat_id ? updateShtrat(Shtrat) : createShtrat(Shtrat);
    }

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={Shtrat}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Shkruani emrin e departamentit...' />
                        <MyTextArea rows={3} name='description' placeholder='Shkruani pershkrimin e departamentit...' />
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