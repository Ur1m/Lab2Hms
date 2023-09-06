import { observer } from 'mobx-react-lite';
import react, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';


export default observer(function InfermierjaForm(){
   const history=useHistory();
    const {infermierjaStore}=useStore();
    const {createInfermierja, updateInfermierja, loading, loadInfermierja,loadingInitial}=infermierjaStore;
    const {infermierja_id}=useParams<{infermierja_id:string}>();

    const [infermierja, setInfermierja]= useState ({
        infermierja_id:'',
        emri:'',
        mbiemri:'',
        koeficienti:'',
        departamenti:'',

    });

    useEffect(()=>{
        if(infermierja_id) loadInfermierja(infermierja_id).then(imfermierja=>setInfermierja(infermierja!));
    }, [infermierja_id,loadInfermierja]);

   function handleSubmit (){
      if (infermierja.infermierja_id.length===0){
            let newInfermierja={
                ...infermierja,
                id:uuid()
            };
            createInfermierja(newInfermierja).then(()=>history.push(`/infermieret/${newInfermierja.infermierja_id}`))
      } 
      else{
          updateInfermierja(infermierja).then(()=>history.push (`/infermieret/${infermierja.infermierja_id}`))
      }
   }

   function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value}=event.target;
        setInfermierja({...infermierja, [name]:value})
   }

   if(loadingInitial) return <LoadingComponent content='Loading infermierja...' />
    return(
        <Segment clearing> 
            <Form onSubmit ={handleSubmit} autoComplete='off'>
                <Form.Input placeholder ='Emri'value ={infermierja.emri} name ='emri' onChange={handleInputChange}/>
                <Form.Input placeholder='Mbiemri'value ={infermierja.mbiemri} name ='mbiemri' onChange={handleInputChange}/>
                <Form.Input placeholder='Koeficienti' value ={infermierja.koeficienti} name ='koeficienti' onChange={handleInputChange}/>
                <Form.Input placeholder='Departmenti'value ={infermierja.departamenti} name ='departamenti' onChange={handleInputChange}/>

                <Button loading ={loading} floated='right' positive type ='submit' content='Submit'/>
                <Button floated='right' type ='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})