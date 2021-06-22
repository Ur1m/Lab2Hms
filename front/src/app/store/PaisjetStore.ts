import { makeAutoObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";

import {v4 as uuid} from 'uuid';
import { IPaisjet } from "../models/IPaisjet";

export default class PaisjetStore{
    
    selectedPaisja:IPaisjet | undefined=undefined;
    editmode=false;
    image=undefined;
    paisjetRegistry=new Map<string,IPaisjet>()


    constructor(){
        makeAutoObservable(this)
    }
    loadPaisjet= async ()=>{
       try{
        const paisjet=await agent.Paisjet.list();
        runInAction(()=>{
            paisjet.forEach(p=>{
                p.servisimi=new Date(p.servisimi!);
                this.paisjetRegistry.set(p.paisja_Id,p);
        })
        
        })
       }
       catch(error){
           console.log(error);
       }
    }
    get paisjet(){
        return Array.from(this.paisjetRegistry.values());
    }
    getimage=async(paisje_id:string)=>{
       var x= await agent.Paisjet.details(paisje_id);
       return x.image;
    }   
     selectPaisja=(paisja_Id:string)=>{
      this.selectedPaisja=this.paisjetRegistry.get(paisja_Id);
    }
    canceleSelectedPaisja=()=>{
        this.selectedPaisja=undefined;
    }
    openForm=(paisja_Id?:string)=>{
        paisja_Id? this.selectPaisja(paisja_Id) : this.canceleSelectedPaisja();
        this.editmode=(true);
    }
    closeForm=()=>{
        this.editmode=false;
    }
    createPaisja=async(Paisja :IPaisjet)=>{
        Paisja.paisja_Id=uuid();
        try{
            await agent.Paisjet.create(Paisja);
            runInAction(()=>{
                this.paisjetRegistry.set(Paisja.paisja_Id,Paisja);
                this.selectedPaisja=Paisja;
                this.editmode=false;
                alert("Created successfully");
            })
        }
        catch(error){
            console.log(error);
        }
    }
    updatePaisja=async(Paisja:IPaisjet)=>{
        try{
           await agent.Paisjet.update(Paisja);
           runInAction(()=>{
           
            this.paisjetRegistry.set(Paisja.paisja_Id,Paisja)
             this.selectedPaisja=Paisja;
             this.editmode=false;
             alert("Updated successfully");
           })
        }
        catch(error){
            console.log(error);
        }
    }
    deletePaisja=async(id:string)=>{
        try{
            if(window.confirm('Are you sure')){
           await agent.Paisjet.delete(id);
           runInAction(()=>{
            
            this.paisjetRegistry.delete(id);
            ;if(this.selectedPaisja?.paisja_Id==id)this.canceleSelectedPaisja();

           })
        }
        }
        catch(error){
            console.log(error);
        }
    }
}