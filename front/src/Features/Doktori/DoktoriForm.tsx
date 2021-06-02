import { observer } from 'mobx-react-lite';
import React ,{  FormEvent, useContext, useEffect, useState}from 'react'
import { Button, Form ,Input,Segment, TextArea} from 'semantic-ui-react'
import { Link, RouteComponentProps } from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import { IDoktori } from '../../app/models/Doktori';
import doktoretStor from '../../app/store/doktoretStor';
import {Form as FinalForm,Field} from 'react-final-form';
import TextInput from '../../app/FormElements/TextInput';
import SelectInput from '../../app/FormElements/Select';
import { departamentet } from '../../app/FormElements/DoktoriOptions';
import {specializimet} from '../../app/FormElements/SpecializimiOptions';
import DateTimeP from '../../app/FormElements/DateTimePic';

interface IProps{
    seteditmode:(editmode:boolean)=>void;
    selectedDoktori:IDoktori;
    createDoktor:(doktori:IDoktori)=>void;
    editDoktor:(doktori:IDoktori)=>void;

}

export const DoktoriForm:React.FC<IProps> = ({seteditmode,selectedDoktori:innit,createDoktor,editDoktor}) => {
    const InitializeForm=()=>{
        if(innit){
            return innit;
        }
        else{
           return{
            mjeku_Id:'',
            emri:'',
            mbimeri:'',
             ditlindja:'',
             specializimi:'',
             depName:''

           }
           

        }
    }
    const [selectedDoktori,setselectedDoktori]=useState<IDoktori>(InitializeForm)
    const handleinputchange =(event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    
        setselectedDoktori({...selectedDoktori,[event.currentTarget.name]:event.currentTarget.value});
    };
   /* const handlesubmit=()=>{
       if(selectedDoktori.mjeku_Id.length ===0){
          let newselectedDoktor ={
              ...selectedDoktori,mjeku_Id: uuid()
          }
          createDoktor(newselectedDoktor);
        }
         
          else{
          editDoktor(selectedDoktori);
          }
       
    }*/
    const FinalFormSubmit=(values:any)=>{
        console.log(values);

    }
    const handleData=(Date:string)=>{
        var date=Date.split("T")[0];
        return date;;
    }
    return (
        <Segment clearing>
            <FinalForm  onSubmit={FinalFormSubmit}
            initialValues={selectedDoktori}
            render={({handleSubmit})=>(
            <Form onSubmit={handleSubmit}>
                <Field name='emri'placeholder='Emri'  children={TextInput} />
                    <Field placeholder="Mbimeri..."name="mbimeri"  children={TextInput} />
                    <Field children={DateTimeP} placeholder="Datalindjes" name="ditlindja"/>
                    <Field placeholder="Specializimi"name="specializimi"options={specializimet} children={SelectInput}/>
                    <Field  placeholder='departamnti' name='depName' children={SelectInput}  options={departamentet} />
                    <Button floated="right" positive type='subimit' content='submit'/>
                    <Button onClick={()=>seteditmode(false)}floated="right"  type='subimit' content='cancel'/>
                </Form>

            )

            }/>
            
        </Segment>
    )
}