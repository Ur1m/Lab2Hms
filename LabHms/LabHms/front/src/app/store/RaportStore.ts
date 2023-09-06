import { makeAutoObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";

import {v4 as uuid} from 'uuid';
import { IPaisjet } from "../models/IPaisjet";
import { IRaport } from "../models/IRaport";
import { IPacienti } from "../models/IPacienti";

export default class RaportStore{
    
    selectedRaport:IRaport | undefined=undefined;
    editmode=false;
    image=undefined;
    detailsmode=false;
    raportiRegistry=new Map<string,IRaport>();
    Paisjet: IPaisjet[] =[];
   


    constructor(){
        makeAutoObservable(this)
    }
    loadRaportet= async ()=>{
       try{
        const raporti=await agent.Raport.list();
        runInAction(()=>{
            raporti.forEach(t=>{
                
                this.raportiRegistry.set(t.raport_Id,t);
        })
        
        })
       }
       catch(error){
           console.log(error);
       }
    }
    get raporti(){
        return Array.from(this.raportiRegistry.values());
    }
    
    openDetails=(id:string)=>{
        this.selectRaport(id);
        this.detailsmode=true;
    }
    closeDetails=()=>{
        this.detailsmode=false;
    }   
     selectRaport=(id:string)=>{
      this.selectedRaport=this.raportiRegistry.get(id);
    }
    canceleSelectedRaport=()=>{
        this.selectedRaport=undefined;
    }
    openForm=(id?:string)=>{
        id? this.selectRaport(id) : this.canceleSelectedRaport();
        this.editmode=(true);
    }
    closeForm=()=>{
        this.editmode=false;
    }
    createRaport=async(Raport :IRaport)=>{
        Raport.raport_Id=uuid();
        try{
            await agent.Raport.create(Raport);
            runInAction(()=>{
                this.raportiRegistry.set(Raport.raport_Id,Raport);
                this.selectedRaport=Raport;
                this.editmode=false;
                
            })
        }
        catch(error){
            console.log(error);
        }
    }
    updateRaport=async(Raport:IRaport)=>{
        try{
           await agent.Raport.update(Raport);
           runInAction(()=>{
           
            this.raportiRegistry.set(Raport.raport_Id,Raport)
             this.selectedRaport=Raport;
             this.editmode=false;
            
           })
        }
        catch(error){
            console.log(error);
        }
    }
    deleteRaport=async(id:string)=>{
        try{
            
           await agent.Raport.delete(id);
           runInAction(()=>{
            
            this.raportiRegistry.delete(id);
            ;if(this.selectedRaport?.raport_Id==id)this.canceleSelectedRaport();

           })
        
        }
        catch(error){
            console.log(error);
        }
    }
    getPaisjet = async() => {
        try{
            const Paisjet = await agent.Paisjet.list();
            Paisjet.forEach(Paisjet => {
                    this.Paisjet.push(Paisjet);
                })
                return Paisjet;
        } catch(error){
            console.log(error);
        }
    }
    
      }
