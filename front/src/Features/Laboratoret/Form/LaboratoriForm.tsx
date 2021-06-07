import React,{FormEvent, useState, useEffect} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import { Formik } from 'formik';
import { ILaboratori } from '../../../app/models/ILaboratori';

interface IProps{
    setEditMode:(editMode: boolean) => void;
    laboratori:ILaboratori 
    createLaboratori: (laboratori: ILaboratori) =>void;
    editLaboratori: (laboratori: ILaboratori) =>void;
}

const LaboratoriForm: React.FC<IProps> = ({
    setEditMode,
    laboratori: intitialFormState,
    createLaboratori,
    editLaboratori,

}) => {

    const initializeForm=()=>{
        if(intitialFormState){
            return intitialFormState
        }
        else{
            return {
                id:'',
                emri: '',
                nrId: '',
                mosha:'',
                pershkrimi:'',
                rezultati:'',
                date:'',
                city:''
            }
        }
    };

    const [laboratori, setLaboratori] =useState<ILaboratori>(initializeForm)

    function handleSubmit() {
        if(laboratori.id.length ===0){
            let newLaboratori={
                ...laboratori,
                id:uuid()
            }
            createLaboratori(newLaboratori);
        }else{
            editLaboratori(laboratori);
        }

    }

    function handleInputChange(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>)  {
        const {name, value}=event.currentTarget;
        setLaboratori({...laboratori, [name]: value})
    }



    return (
        <Segment clearing>
            
                
                    <Form onSubmit={handleSubmit}>
                    <Form.Input 
                    onChange={handleInputChange}
                     name='emri' 
                     placeholder='Emri'
                      value={laboratori.emri} 
                      autoComplete="off"
                      />
                    <Form.Input
                    onChange={handleInputChange}
                    name='nrId' 
                     rows={2}
                     placeholder='Numri Personal'
                       value={laboratori.nrId}
                        />
                    <Form.Input 
                    onChange={handleInputChange}
                    name='mosha' 
                    placeholder='Mosha e Pacientit'
                     value={laboratori.mosha}
                      />
                      <Form.Input 
                    onChange={handleInputChange}
                    name='pershkrimi' 
                    placeholder='Pershkrimi'
                     value={laboratori.pershkrimi}
                      />
                      <Form.Input 
                    onChange={handleInputChange}
                    name='rezultati' 
                    placeholder='Rezultati'
                     value={laboratori.rezultati}
                      />
                    <Form.Input
                     onChange={handleInputChange}
                     name='date'  
                     type='datetime-local' 
                     placeholder='Date' 
                     value={laboratori.date}
                     />
                    <Form.Input
                     onChange={handleInputChange}
                     name='city' 
                     placeholder='City' 
                     value={laboratori.city}
                      />
                    <Button floated='right' positive type ='submit' content='Shto'/>
                    <Button
                     onClick={()=> setEditMode(false)}
                    floated='right'
                    type ='button' 
                    content='Anulo'/>
                </Form>
               
            
            
        </Segment>
    )
}

export default LaboratoriForm;
