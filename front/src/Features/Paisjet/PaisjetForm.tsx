import {  FormEvent, useState } from "react";
import { IPaisjet } from "../../app/models/IPaisjet";
import { useStorePaisjet } from "../../app/stores/store";
import * as yup from 'yup';
import { Button, Form, Input, Segment, TextArea } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from '../../app/common/form/MySelectInput';

import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";
import { IDepartment } from "../../app/models/IDepartment";
import { IPacientetDropDown } from "../../app/models/IPacienti";

export const PaisjetForm = () => {
    const {PaisjetStore}=useStorePaisjet();
    const{selectedPaisja,closeForm,updatePaisja,createPaisja,getDepartmentet}=PaisjetStore;
    
   
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

    let department: IDepartment[] = [];
    let departmentDropDown: IPacientetDropDown[] = [];

    getDepartmentet().then(response => {
        response?.forEach(element => {
            department.push(element);
        });
        for(var i = 0; i < department.length;i++){
            
            var departmentiDropDown: IPacientetDropDown = { text: department[i].name  , key: department[i].department_id, value: department[i].department_id}
            departmentDropDown.push(departmentiDropDown);
        }
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
              <MySelectInput options={departmentDropDown} placeholder='Zgjedhni departamentin...' name='department_Id'></MySelectInput>
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

        