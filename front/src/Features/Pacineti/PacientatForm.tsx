import React, { FormEvent, useState } from "react";
import { Button,  FormField,  Label,  Segment } from "semantic-ui-react";
import { IPacienti } from "../../app/models/IPacienti";
import { useStorePacientat } from "../../app/stores/store";
import { Formik,Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import MySelectInput from "../../app/common/form/MySelectInput";
import { gruprtgjakut, Qytetet } from "../../app/FormElements/Qyteti";
import MyDateInput from "../../app/common/form/MyDateInput";




export const PacientatForm = () => {
    const {PacientatStore}=useStorePacientat();
    const{pacientat,selectedPacienti,openForm,closeForm,updatePacineti,createPacineti}=PacientatStore;
    
   
    const initialState = selectedPacienti ?? {
        pacient_Id:'',
        emri: '',
        mbimeri: '',
        adresa:'',
        qyteti:'',
        ditlindja:null,
        grupigjakut:''
    }
    const [Pacineti,setPacienti]=useState<IPacienti>(initialState)
    const handleinputchange =(event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    
        setPacienti({...Pacineti,[event.currentTarget.name]:event.currentTarget.value});
    };
    const handleFormsubmit=(Pacineti:IPacienti)=>{
        Pacineti.pacient_Id? updatePacineti(Pacineti) : createPacineti(Pacineti);
      
    }
    const validationSchema=yup.object({
        emri:yup.string().matches(/^[a-zA-Z0-9]{3,12}$/,'Emri duhet te ket mbi 3 shkronja deri ne 12').required("Ju lutem shenoni emrin "),
        mbimeri:yup.string().matches(/^[a-zA-Z0-9]{3,}$/,'Mbimeri duhet te ket mbi 3 shkronja').required("Ju lutem shenoni Mbimerin"),
        adresa:yup.string().required("Ju lutem shenoni adresen").matches(/^[a-zA-Z0-9]{3,}$/,'Adresa duhet te ket mbi 3 shkronja'),
        qyteti:yup.string().required('ju lutem selektoni qytetin tuaj'),
        ditlindja:yup.string().required().nullable(),
        grupigjakut:yup.string().required('ju lutem selektoni grupin e gjakut'),
        


    })

    //selectedPacineti
    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
            enableReinitialize 
            initialValues={Pacineti} onSubmit={values => handleFormsubmit(values)}>
            {({handleSubmit,isSubmitting,dirty,isValid})=>(
                <Form className='ui form' onSubmit={handleSubmit}>
                   <MyTextInput name='emri' placeholder='Emri..'/>
                
                <MyTextInput placeholder="Mbiemri"name="mbimeri"/>
                <MyTextInput placeholder="Adresa"name="adresa" />
                <MySelectInput options={Qytetet} placeholder="Qyteti"name="qyteti"/>
                <MyDateInput  placeholderText='ditlindja' name="ditlindja"
                maxDate={new Date()}
                minDate={new Date('05/05/1922')} />
                <MySelectInput options={gruprtgjakut} placeholder="Grupi i Gjakut"name="grupigjakut"/>
                
                <Button 
                disabled={isSubmitting || !dirty || !isValid}
                floated="right" positive type='subimit' content='submit'/>
                <Button onClick={closeForm}floated="right"  type='subimit' content='cancel'/>
            </Form>


             )

             }
            </Formik>
            
        </Segment>
    )
}

function uuid() {
    throw new Error("Function not implemented.");
}

