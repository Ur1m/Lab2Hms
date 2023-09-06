
import React ,{  FormEvent, useState}from 'react'
import { Button, Form ,Header,Icon,Modal,Segment, TextArea} from 'semantic-ui-react'
import { IDoktori } from '../../app/models/Doktori';

import {specializimet} from '../../app/FormElements/SpecializimiOptions';

import { Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import * as yup from 'yup';
import MyDateInput from '../../app/common/form/MyDateInput';
import MySelectInput from '../../app/common/form/MySelectInput';
import { useStoreDoktorat } from '../../app/stores/store';
import { IDepartment } from '../../app/models/IDepartment';
import { IPacientetDropDown } from '../../app/models/IPacienti';

import { observer } from 'mobx-react-lite';
import { on } from 'stream';


export default  observer( function DoktoriForm ()  {
    const {DoktoratStore}=useStoreDoktorat();
    const{closeForm,selectedDoktori,updateDoktori,createDoktori,doktorat,getDepartmentet,modali
    }=DoktoratStore;
    var open=false;
   

   var i=0;
    const initialState = selectedDoktori ?? {
        mjeku_Id:'',
        emri: '',
        mbimeri: '',
        ditlindja:null,
        specializimi:'',
        depName:''
    }
    const [Doktori,setDoktori]=useState<IDoktori>(initialState)
    const handleinputchange =(event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    
        setDoktori({...Doktori,[event.currentTarget.name]:event.currentTarget.value});
    };
   
    const handleFormsubmit=(Doktori:IDoktori)=>{
      if(!Doktori.mjeku_Id){
        for(i==0 ; i<doktorat.length;i++){
         if(doktorat[i].emri===Doktori.emri && doktorat[i].mbimeri===Doktori.mbimeri ){
             open=true;
         }
        
       }
       if(!open){
         createDoktori(Doktori);
         open=false;
       }
       else{
           alert("Nuk mund ta insertoni doktorin e njejt")
           open=false;
           
           closeForm();
        DoktoratStore.modali=true;
       }
    }
    else{
        updateDoktori(Doktori)
    }
       
    }
    
   
        
    
    
    const validationSchema=yup.object({
        emri:yup.string().required("Emri eshte i domosdoshem").matches(/^[a-zA-Z0-9]{3,}$/,'Emrri duhet te ket mbi 3 shkronja'),
        mbimeri:yup.string().required("Mbimeri nuk duhet te jete i zbrazet").matches(/^[a-zA-Z0-9]{3,}$/,'Mbimeri duhet te ket mbi 3 shkronja'),
        ditlindja:yup.string().required("ditlindja eshte e domosdoshme").nullable(),
        specializimi:yup.string().required('ju lutem selektoni specializimin'),
        depName:yup.string().required("ju Lutem selektoni departamentin")
        


    })
    let department: IDepartment[] = [];
    let departmentDropDown: IPacientetDropDown[] = [];

    getDepartmentet().then(response => {
        response?.forEach(element => {
            department.push(element);
        });
        for(var i = 0; i < department.length;i++){
            
            var departmentiDropDown: IPacientetDropDown = { text: department[i].name  , key: department[i].department_id, value: department[i].name}
            departmentDropDown.push(departmentiDropDown);
        }
    })
    return (
       
        <Segment clearing>
          
              <Formik validationSchema={validationSchema}
            enableReinitialize initialValues={Doktori!} onSubmit={values => handleFormsubmit(values)}>
            {({handleSubmit,isSubmitting,dirty,isValid})=>(
                <Form className='ui form' onSubmit={handleSubmit}>
                  <MyTextInput placeholder='Emri' name="emri"/>
                  <MyTextInput placeholder="Mbimeri" name="mbimeri"/>
                  <MyDateInput  placeholderText='ditlindja' name="ditlindja"
                  maxDate={new Date('01/01/1998')}
                  minDate={new Date('01/01/1960')}/>
                  <MySelectInput options={specializimet} placeholder='Specializimi' name='specializimi'/>
                  <MySelectInput options={departmentDropDown} placeholder='Zgjedhni departamentin...' name='depName'></MySelectInput>
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
);
          
            

            
            
       
    
