import { makeAutoObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";

import {v4 as uuid} from 'uuid';
import { IPaisjet } from "../models/IPaisjet";
import { ITherapy } from "../models/ITherapy";
import { IPacienti } from "../models/IPacienti";

export default class TherapyStore{
    
    selectedTherapy:ITherapy | undefined=undefined;
    editmode=false;
    image=undefined;
    detailsmode=false;
    terapiaRegistry=new Map<string,ITherapy>();
    Pacientat: IPacienti[] =[];
   


    constructor(){
        makeAutoObservable(this)
    }
    loadTerapit= async ()=>{
       try{
        const terapit=await agent.Therapy.list();
        runInAction(()=>{
            terapit.forEach(t=>{
                
                this.terapiaRegistry.set(t.therapy_Id,t);
        })
        
        })
       }
       catch(error){
           console.log(error);
       }
    }
    get terapit(){
        return Array.from(this.terapiaRegistry.values());
    }
    
    openDetails=(id:string)=>{
        this.selectTerapin(id);
        this.detailsmode=true;
    }
    closeDetails=()=>{
        this.detailsmode=false;
    }   
     selectTerapin=(id:string)=>{
      this.selectedTherapy=this.terapiaRegistry.get(id);
    }
    canceleSelectedTerapin=()=>{
        this.selectedTherapy=undefined;
    }
    openForm=(id?:string)=>{
        id? this.selectTerapin(id) : this.canceleSelectedTerapin();
        this.editmode=(true);
    }
    closeForm=()=>{
        this.editmode=false;
    }
    createTerapin=async(Therapy :ITherapy)=>{
        Therapy.therapy_Id=uuid();
        try{
            await agent.Therapy.create(Therapy);
            runInAction(()=>{
                this.terapiaRegistry.set(Therapy.therapy_Id,Therapy);
                this.selectedTherapy=Therapy;
                this.editmode=false;
                
            })
        }
        catch(error){
            console.log(error);
        }
    }
    updateTerapin=async(Therapy:ITherapy)=>{
        try{
           await agent.Therapy.update(Therapy);
           runInAction(()=>{
           
            this.terapiaRegistry.set(Therapy.therapy_Id,Therapy)
             this.selectedTherapy=Therapy;
             this.editmode=false;
            
           })
        }
        catch(error){
            console.log(error);
        }
    }
    deleteTherapy=async(id:string)=>{
        try{
            
           await agent.Therapy.delete(id);
           runInAction(()=>{
            
            this.terapiaRegistry.delete(id);
            ;if(this.selectedTherapy?.therapy_Id==id)this.canceleSelectedTerapin();

           })
        
        }
        catch(error){
            console.log(error);
        }
    }
    getPacientet = async() => {
        try{
            const Pacientat = await agent.Pacientat.list();
            Pacientat.forEach(Pacienti => {
                    this.Pacientat.push(Pacienti);
                })
                return Pacientat;
        } catch(error){
            console.log(error);
        }
    }
    
      }
