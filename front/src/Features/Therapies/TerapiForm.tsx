import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStoreTherapies } from "../../app/stores/store";
import * as Yup from 'yup';
import { ITherapy } from "../../app/models/ITherapy";
import { Button, Form, Segment, Select } from "semantic-ui-react";
import { Formik } from "formik";
import { IPacientetDropDown, IPacienti } from "../../app/models/IPacienti";
import MySelectInput from "../../app/common/form/MySelectInput";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";

export default observer(function TerapiaForm() {
    const {TherapyStore} = useStoreTherapies();
    const {selectedTherapy, editmode,updateTerapin,createTerapin,getPacientet,closeForm} = TherapyStore;


    const initialState = selectedTherapy ?? {
        therapy_Id: '',
        terapia:'',
        onGoing:'',
        pacient_id:''
    }

    const [Terapia, setTerapia] = useState(initialState);

    const validationSchema = Yup.object({
        terapia: Yup.string().required(),
       
        pacient_id: Yup.string().required()
    })

    function handleFormSubmit(Terapia: ITherapy) {
        Terapia.therapy_Id ? updateTerapin(Terapia) : createTerapin(Terapia);
    }
    let pacientet: IPacienti[] = [];
    let pacientetDropDown: IPacientetDropDown[] = [];
    getPacientet().then(response => {
        response?.forEach(element => {
            pacientet.push(element);
        });
        for(var i = 0; i < pacientet.length;i++){
            
            var pacientiDropDown: IPacientetDropDown = { text: pacientet[i].emri + " " + pacientet[i].mbimeri, key: pacientet[i].pacient_Id, value: pacientet[i].pacient_Id}
            pacientetDropDown.push(pacientiDropDown);
        }
        var  status 
    })

    return (
        <Segment clearing>
            
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={Terapia}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                           {   <MySelectInput options={pacientetDropDown} placeholder='Zgjedhni pacientin...' name='pacient_id'></MySelectInput>}
                           
                           <MyTextArea rows={3} name='terapia' placeholder='Shkruani pershkrimin e terapis...' />
                           <select className="ui dropdown" name="onGoing">
  
  <option value="1">True</option>
  <option value="0">False</option>
</select>
                       
                        
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
