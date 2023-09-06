import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStoreRaport } from "../../app/stores/store";
import * as Yup from 'yup';
import { IRaport } from "../../app/models/IRaport";
import { Button, Form, Segment, Select } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from "../../app/common/form/MySelectInput";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { IPaisjet, IPaisjetDropDown } from "../../app/models/IPaisjet";
import MyDateInput from "../../app/common/form/MyDateInput";
import "./raport.css";

export default observer(function RaportForm() {
    const {RaportStore} = useStoreRaport();
    const {selectedRaport, editmode,updateRaport,createRaport,getPaisjet,closeForm} = RaportStore;


    const initialState = selectedRaport ?? {
        raport_Id: '',
        raporti:'',
        date:null,
        paisja_Id:''
    }

    const [Raport, setRaport] = useState(initialState);

    const validationSchema = Yup.object({
        raporti: Yup.string().required(),
       
        paisja_Id: Yup.string().required()
    })

    function handleFormSubmit(Raport: IRaport) {
        Raport.raport_Id ? updateRaport(Raport) : createRaport(Raport);
    }
    let paisjet: IPaisjet[] = [];
    let paisjetDropDown: IPaisjetDropDown[] = [];
    getPaisjet().then(response => {
        response?.forEach(element => {
            paisjet.push(element);
        });
        for(var i = 0; i < paisjet.length;i++){
            
            var paisjeDropDown: IPaisjetDropDown = { text: paisjet[i].emertimi + " " + paisjet[i].pershkrimi, key: paisjet[i].paisja_Id, value: paisjet[i].paisja_Id}
            paisjetDropDown.push(paisjeDropDown);
        }
        var  status 
    })

    return (
        <Segment clearing className="ssss">
            
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={Raport}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                           {   <MySelectInput options={paisjetDropDown} placeholder='Zgjedhni paisjen...' name='paisja_Id'></MySelectInput>}
                           
                           <MyTextArea rows={3} name='raporti' placeholder='Shkruani pershkrimin e raportit...' />
                           <MyDateInput name='date' placeholderText='date'
               showTimeSelect
               timeCaption='time'
               dateFormat='MMMM d, yyyy h:mm aa'
               minDate={new Date()}
               filterDate={date=> date.getDay()!=0 && date.getDay()!=6}
               filterTime={time=> time.getHours()<16 && time.getHours()>8}
               isClearable/>
                       
                        
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                         
                        floated='right' positive type='submit' content='Shto' />
                        <Button onClick={closeForm} floated='right' type='button' content='Anulo' />   
                    </Form>
                )}
            </Formik>

        </Segment>
    )
                })
                function uuid() {
                    throw new Error("Function not implemented.");
                }