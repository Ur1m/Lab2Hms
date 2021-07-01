import { FormEvent, useState } from "react";
import { Barna } from "../../app/models/barna";
import { useStoreBarnat } from "../../app/stores/store";
import * as yup from 'yup';
import { Button, Form, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";

export const BarnatForm = () => {
    const {BarnatStore}=useStoreBarnat();
    const{selectedBarna,closeForm,updateBarna,createBarna}=BarnatStore;
    
   
    const initialState = selectedBarna ?? {
        barnat_Id: '',
        bName: '',
        description: '',
        dataRegjistrimit: null,
        image:''
    }
    const [Barna,setBarna]=useState<Barna>(initialState)
    const [image,setimage]=useState<any>();
    const handleinputchange =(event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    
        setBarna({...Barna,[event.currentTarget.name]:event.currentTarget.value});
    };
    const changefile=(event:any)=>{
     
        let v=event.target.files;
        let reader=new FileReader();
     reader.readAsDataURL(v[0]);
        reader.onload=(e)=>{
         setimage( e.target?.result);
        }
     }
    const handleFormsubmit=(barna:Barna )=>{
       barna!.image=image;
       barna.dataRegjistrimit=new Date();
    
   Barna?.barnat_Id? updateBarna(barna) : createBarna(barna);

       
      
    }
    const validationSchema=yup.object({
        bName:yup.string().matches(/^[a-zA-Z0-9]{3,}$/,'Passwordi duhet te ket mbi 3 shkronja').required("Ju lutem shenoni emrin e paisjes"),
        description:yup.string().required("Pershkrimi nuk duhet te jete i zbrazet").matches(/^[a-zA-Z0-9 -?]{15,}$/,'Pershkrimi nuk duhet me qene ner 15 karaktere'),
     // dataRegjistrimit:yup.string().required("Selektoni daten e servisimimit te fundit"),
      
      // image:yup.string().required("Selektoni foton")
      


    })

   
  
    return (
        <Segment clearing>
     <Formik validationSchema={validationSchema}
            enableReinitialize 
            initialValues={Barna} onSubmit={values => handleFormsubmit(values)}>
            {({handleSubmit,isSubmitting,dirty,isValid})=>(
                <Form className='ui form' onSubmit={handleSubmit}>
                   <MyTextInput name='bName' placeholder='Emri..'/>
                
                <MyTextArea rows={3} placeholder="pershkrimi"name="description"/>
             
              
              <input type='file' name='image' onChange={changefile} />

                
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
