import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStoreLaboratori, useStoreRaport } from "../../app/stores/store";
import * as Yup from 'yup';
import { IRaport } from "../../app/models/IRaport";
import { Button, Form, Segment, Select } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from "../../app/common/form/MySelectInput";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { IPaisjet, IPaisjetDropDown } from "../../app/models/IPaisjet";
import MyDateInput from "../../app/common/form/MyDateInput";

import { ILaboratori } from "../../app/models/ILaboratori";
import { IDepartametnetDropDown, IDepartment } from "../../app/models/IDepartment";

export default observer(function LaboratoriStore() {
    const {LaboratoriStore} = useStoreLaboratori();
    const {selectedLaborator, editMode,updateLaborator,createLaborator,getDepartamentet,closeForm,loading} = LaboratoriStore;


    const initialState = selectedLaborator ?? {
        lab_Id: '',
        emri:'',
        pershkrimi:'',
        fotografia:'',
        department_id:''
    }

    const [Laboratori, setLaboratori] = useState(initialState);
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

    function handleFormSubmit(Laboratori: ILaboratori) {
        Laboratori!.fotografia=fotografia;
        Laboratori.lab_Id ? updateLaborator(Laboratori) : createLaborator(Laboratori);
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
                initialValues={Laboratori}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                             
                           
                           <MyTextArea rows={3} name='emri' placeholder='Shkruani emrin e laboratorit...' />
                           <MyTextArea rows={3} name='pershkrimi' placeholder='Shkruani pershkrimin e laboratorit...' />
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