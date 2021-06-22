import {  FormEvent, useState } from "react";
import { IPaisjet } from "../../app/models/IPaisjet";
import { useStorePaisjet } from "../../app/stores/store";
import * as yup from 'yup';
import { Button, Form, Input, Segment, TextArea } from "semantic-ui-react";
import { Formik } from "formik";

import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";

export const PaisjetForm = () => {
    const {PaisjetStore}=useStorePaisjet();
    const{selectedPaisja,closeForm,updatePaisja,createPaisja,getimage}=PaisjetStore;
    
   
    const initialState = selectedPaisja ?? {
        paisja_Id:'',
        emertimi: '',
       pershkrimi:'',
       servisimi:null,
       department_Id:'',
       image:''
      


    }
    const [Paisja,setPaisja]=useState<IPaisjet>(initialState)
    const [image,setimage]=useState<any>();
    const handleinputchange =(event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    
        setPaisja({...Paisja,[event.currentTarget.name]:event.currentTarget.value});
    };
    const changefile=(event:any)=>{
     
        let v=event.target.files;
        let reader=new FileReader();
     reader.readAsDataURL(v[0]);
        reader.onload=(e)=>{
         setimage( e.target?.result);
        }
     }
    const handleFormsubmit=(Paisja?:IPaisjet )=>{
       Paisja!.image=image;
    
   Paisja?.paisja_Id? updatePaisja(Paisja) : createPaisja(Paisja!);

       
      
    }
    const validationSchema=yup.object({
        emertimi:yup.string().required("Emri eshte i domosdoshem"),
       pershkrimi:yup.string().required("Mbimeri nuk duhet te jete i zbrazet"),
       servisimi:yup.string().required("Shenoni servisimin"),
       department_Id:yup.string().required()
      


    })
  
    return (
        <Segment clearing>
     <Formik validationSchema={validationSchema}
            enableReinitialize 
            initialValues={Paisja} onSubmit={values => handleFormsubmit(values)}>
            {({handleSubmit,isSubmitting,dirty,isValid})=>(
                <Form className='ui form' onSubmit={handleSubmit}>
                   <MyTextInput name='emertimi' placeholder='Emri..'/>
                
                <MyTextInput placeholder="pershkrimi"name="pershkrimi"/>
              <MyDateInput name="servisimi" placeholderText="servisimi..."/>
              <MyTextInput name="department_Id" placeholder="department"/>
              <input type='file' name='image' id="image-id"onChange={changefile} />

                
                <Button 
                disabled={isSubmitting || !dirty || !isValid}
                floated="right" positive type='subimit' content='submit'/>
                <Button onClick={closeForm}floated="right"  type='subimit' content='cancel'/>
            </Form>


             )

             }
            </Formik>


          
           
            
        </Segment>
    );
}

        