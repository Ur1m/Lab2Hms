import { FormEvent, useState } from "react";
import { ITerminet } from "../../app/models/Terminet";
import { useStoreTerminet } from "../../app/stores/store";
import * as yup from 'yup';
import { Button, Form, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from "../../app/common/form/MyDateInput";
import { Doktoret, Pacientat, Qytetet } from "../../app/FormElements/Qyteti";
import MyDateInput from "../../app/common/form/MyDateInput";
import MyTextInput from "../../app/common/form/MyTextInput";

export const TerminatForm = () => {
    const {TerminetStore}=useStoreTerminet();
    const{terminet,selectedTermini,openForm,closeForm,updateTermini,createTermini}=TerminetStore;
    
   
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
      //  orari:yup.string().required(),

        


    })
    
  

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
            enableReinitialize 
            initialValues={Termini} onSubmit={values => handleFormsubmit(values)}>
            {({handleSubmit,isSubmitting,dirty,isValid})=>(
                <Form className='ui form' onSubmit={handleSubmit}>
               { !Termini.termini_ID && <MyTextInput name="pacient_Id" placeholder="Pacineti"/>}
               { !Termini.termini_ID && <MyTextInput placeholder='Mjeku' name="mjeku_Id"/>}
                <input type='datetime-local'  placeholder='orari' name="orari" />
                
               
                
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