import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStoreAmbulancat, useStoreLaboratori, useStoreRaport } from "../../app/stores/store";
import * as Yup from 'yup';
import { IRaport } from "../../app/models/IRaport";
import { Button, Form, Segment, Select } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from "../../app/common/form/MySelectInput";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { IPaisjet, IPaisjetDropDown } from "../../app/models/IPaisjet";
import MyDateInput from "../../app/common/form/MyDateInput";
import { IDepartametnetDropDown, IDepartment } from "../../app/models/IDepartment"; 
import { IAmbulanca } from "../../app/models/IAmbulanca";

export default observer(function AmbulancaStore() {
    const {AmbulancaStore} = useStoreAmbulancat();
    const {selectedAmbulanca, editMode,updateAmbulancat,createAmbulancat,getDepartamentet,closeForm,loading} = AmbulancaStore;


    const initialState = selectedAmbulanca ?? {
        amb_Id: '',
        tipi:'',
        fotografia:'',
        department_id:''
    }

    const [Ambulanca, setAmbulanca] = useState(initialState);
    const [fotografia, setfotografia] = useState<any>();

    const validationSchema = Yup.object({
   
    })
    const changefile=(event:any)=>{
     
        let v=event.target.files;
        let reader=new FileReader();
        reader.readAsDataURL(v[0]);
        reader.onload=(e)=>{
         setfotografia( e.target?.result);
        }
     }

    function handleFormSubmit(Ambulanca: IAmbulanca) {
        Ambulanca!.fotografia=fotografia;
        Ambulanca.amb_Id ? updateAmbulancat(Ambulanca) : createAmbulancat(Ambulanca);
    }
    let departamentet: IDepartment[] = [];
    let departamentetDropDown: IDepartametnetDropDown[] = [];
    getDepartamentet().then(response => {
        response?.forEach(element => {
            departamentet.push(element);
        });
        for(var i = 0; i < departamentet.length;i++){
            
            var departamenteDropDown: IDepartametnetDropDown = { text: departamentet[i].name + " " + departamentet[i].description, key: departamentet[i].department_id, value: departamentet[i].department_id}
            departamentetDropDown.push(departamenteDropDown);
        }
        var  status 
    })

    return (
        <Segment clearing className="ssss">
            
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={Ambulanca}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                             
                           
                           <MyTextArea rows={3} name='tipi' placeholder='Shkruani tipin e ambulacnes...' />
                         
                           <MySelectInput options={departamentetDropDown} placeholder='Zgjedhni departamentin...' name='department_id'></MySelectInput>
                           <label>Fotorgrafia: </label>
                        <input type='file' name='fotografia' id="image-id"onChange={changefile} />
                       
                        
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
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