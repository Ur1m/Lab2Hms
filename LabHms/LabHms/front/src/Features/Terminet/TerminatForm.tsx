import { FormEvent, useEffect, useState } from "react";
import { ITerminet } from "../../app/models/Terminet";
import { useStoreTerminet } from "../../app/stores/store";
import * as yup from 'yup';
import { Button, Form, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from '../../app/common/form/MySelectInput';
import { Doktoret, Pacientat, Qytetet } from "../../app/FormElements/Qyteti";
import MyDateInput from "../../app/common/form/MyDateInput";
import MyTextInput from "../../app/common/form/MyTextInput";
import { IPacientetDropDown, IPacienti } from "../../app/models/IPacienti";
import { IDoktori } from "../../app/models/Doktori";

export const TerminatForm = () => {
    const {TerminetStore}=useStoreTerminet();
    const{terminet,selectedTermini,openForm,closeForm,updateTermini,createTermini,getPacientet,getDoktoret}=TerminetStore;

   
    
   
    const initialState = selectedTermini ?? {
       termini_ID:'',
      pacient_Id:'',
      mjeku_Id:'',
      orari:null
    }
    const [Termini,setTermini]=useState<ITerminet>(initialState)
    const handleinputchange =(event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    
        setTermini({...Termini,[event.currentTarget.name]:event.currentTarget.value});
    };
    const handleFormsubmit=(Termini:ITerminet)=>{
        
       Termini.termini_ID? updateTermini(Termini) : createTermini(Termini);
     
     
    }
    const validationSchema=yup.object({
      pacient_Id:yup.string().required("Selekto pacinetin"),
       mjeku_Id:yup.string().required("selektoni mjekun"),
       orari:yup.string().required(),

        


    })
    let pacientet: IPacienti[] = [];
    let pacientetDropDown: IPacientetDropDown[] = [];
    let Doktoret:IDoktori[]=[];
    let doktoretDropDown: IPacientetDropDown[]=[];
    getDoktoret().then(response => {
        response?.forEach(element => {
            Doktoret.push(element);
        });
        for(var i = 0; i < Doktoret.length;i++){
            
            var doktorDropDown: IPacientetDropDown = { text: Doktoret[i].emri + " " + Doktoret[i].mbimeri, key: Doktoret[i].mjeku_Id, value: Doktoret[i].mjeku_Id}
        doktoretDropDown.push(doktorDropDown);
        }
    })
    getPacientet().then(response => {
        response?.forEach(element => {
            pacientet.push(element);
        });
        for(var i = 0; i < pacientet.length;i++){
            
            var pacientiDropDown: IPacientetDropDown = { text: pacientet[i].emri + " " + pacientet[i].mbimeri, key: pacientet[i].pacient_Id, value: pacientet[i].pacient_Id}
            pacientetDropDown.push(pacientiDropDown);
        }
    })
    
  

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
            enableReinitialize 
            initialValues={Termini} onSubmit={values => handleFormsubmit(values)}>
            {({handleSubmit,isSubmitting,dirty,isValid})=>(
                <Form className='ui form' onSubmit={handleSubmit}>
               {   <MySelectInput options={pacientetDropDown} placeholder='Zgjedhni pacientin...' name='pacient_Id'></MySelectInput>}
               {  <MySelectInput options={doktoretDropDown} placeholder='Zgjedhni doktorin...' name='mjeku_Id'></MySelectInput>}
               <MyDateInput name='orari' placeholderText='orari'
               showTimeSelect
               timeCaption='time'
               dateFormat='MMMM d, yyyy h:mm aa'
               minDate={new Date()}
               filterDate={date=> date.getDay()!=0 && date.getDay()!=6}
               filterTime={time=> time.getHours()<16 && time.getHours()>8}
               isClearable/>
                
               
                
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