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
import MyTextArea from "../../app/common/form/MyTextArea";
import DateTimeP from "../../app/FormElements/DateTimePic";

export const PaisjetForm = () => {
    const {PaisjetStore}=useStorePaisjet();
    const{selectedPaisja,closeForm,updatePaisja,createPaisja,getDepartmentet,paisjet}=PaisjetStore;
    
   var i=0;
   var open=false;
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
    if(!Paisja?.paisja_Id){
       for(i==0 ; i<paisjet.length;i++){
        if(paisjet[i].emertimi===Paisja?.emertimi ){
            open=true;
        }
       
      }
      if(!open){
        createPaisja(Paisja!);
        open=false;
      }
      else{
          alert("Nuk mund ta insertoni Paisjen e njejt")
          open=false;
          
          closeForm();
       
      }
    }
    else{
        updatePaisja(Paisja);
    }
      

       
      
    }
    const validationSchema=yup.object({
        emertimi:yup.string().matches(/^[a-zA-Z0-9]{3,}$/,'Passwordi duhet te ket mbi 3 shkronja').required("Ju lutem shenoni emrin e paisjes"),
       pershkrimi:yup.string().required("Pershkrimi nuk duhet te jete i zbrazet").matches(/^[a-zA-Z0-9]{15,}$/,'Pershkrimi nuk duhet me qene ner 15 karaktere'),
       servisimi:yup.string().required("Selektoni daten e servisimimit te fundit"),
       department_Id:yup.string().required("Selektoni Departamnetin"),
      // image:yup.string().required("Selektoni foton")
      


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
                
                <MyTextArea rows={3} placeholder="pershkrimi"name="pershkrimi"/>
              <MyDateInput name="servisimi" placeholderText="servisimi..."
              maxDate={new Date()}
              filterDate={d => d.getMonth()>d.getMonth()-1}
              isClearable
            scrollableYearDropdown
              />
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

        