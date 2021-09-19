import { FormEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect } from 'react';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import { useStore, useStoreLlojiShtratit } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { ILlojiShtratit } from '../../../app/models/ILlojiShtratit';
import "../Dashboard/lloji.css";
import LlojiShtratitStore from '../../../app/stores/llojiShtratitStore';

export const LlojiShtratitForm = () => {
    const { LlojiShtratitStore } = useStoreLlojiShtratit();
    const { selectedLlojiShtratit, closeForm, createLlojiShtratit, updateLlojiShtratit, loading} = LlojiShtratitStore;
    var i = 0;
    var open = false;

    const initialState = selectedLlojiShtratit ?? {
        llojiShtratit_id: '',
        emri: '',
        pershkrimi: '',
        image: ''
    }
    const [ILlojiShtratit,setllojiShtratit]=useState<ILlojiShtratit>(initialState)
    const [image,setimage]=useState<any>();
    const handleinputchange =(event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    
        setllojiShtratit({...ILlojiShtratit,[event.currentTarget.name]:event.currentTarget.value});
    };
    const changefile=(event:any)=>{
     
        let v=event.target.files;
        let reader=new FileReader();
     reader.readAsDataURL(v[0]);
        reader.onload=(e)=>{
         setimage( e.target?.result);
        }
     }

    const [LlojiShtreterve, setDepartment] = useState(initialState);
    const validationSchema = Yup.object({
        emri: Yup.string().required('Emri i llojit te shtratit nuk mund te jete i zbrazet...'),
        pershkrimi: Yup.string().required('Pershkrimi i llojit te shtratit nuk mund te jete i zbrazet...')
    })

    function handleFormSubmit(LlojiShtreterve: ILlojiShtratit) {
        LlojiShtreterve.llojiShtratit_id ? updateLlojiShtratit(LlojiShtreterve) : createLlojiShtratit(LlojiShtreterve);
    }

    return (
        <Segment className="ssss" clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={LlojiShtreterve}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <label>Lloji: </label>
                        <MyTextInput name='emri' placeholder='Shkruani emrin e llojit te shtratit...' />
                        <label>Pershkrimi:</label>
                        <MyTextArea rows={3} name='pershkrimi' placeholder='Shkruani pershkrimin e llojit te shtratit...' />
                        <input type='file' name='image' onChange={changefile} />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
                        floated='right' positive type='submit' content='Shto' />
                        <Button onClick={closeForm} floated='right' type='button' content='Anulo' />   
                    </Form>
                )}
            </Formik>

        </Segment>
    );
                }