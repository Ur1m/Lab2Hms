import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Barna } from "../models/barna";
import {v4 as uuid} from 'uuid';

export default class BarnatStore{
    
    selectedBarna:Barna | undefined=undefined;
    editmode=false;
    
    BarnatRegistry=new Map<string,Barna>()


    constructor(){
        makeAutoObservable(this)
    }
    loadBarnat= async ()=>{
       try{
        const barnat=await agent.Barnat.list();
        runInAction(()=>{
            barnat.forEach(b=>{
                b.dataRegjistrimit=new Date(b.dataRegjistrimit!);
                this.BarnatRegistry.set(b.barnat_Id,b);
        })
        
        })
       }
       catch(error){
           console.log(error);
       }
    }
    get Barnat(){
        return Array.from(this.BarnatRegistry.values());
    }
    getimage=async(paisje_id:string)=>{
       var x= await agent.Paisjet.details(paisje_id);
       return x.image;
    }   
     selectBarna=(paisja_Id:string)=>{
      this.selectedBarna=this.BarnatRegistry.get(paisja_Id);
    }
    canceleSelectedBarna=()=>{
        this.selectedBarna=undefined;
    }
    openForm=(id?:string)=>{
        id? this.selectBarna(id) : this.canceleSelectedBarna();
        this.editmode=(true);
    }
    closeForm=()=>{
        this.editmode=false;
    }
    createBarna=async(b :Barna)=>{
        b.barnat_Id=uuid();
        try{
            await agent.Barnat.create(b);
            runInAction(()=>{
                this.BarnatRegistry.set(b.barnat_Id,b);
                this.selectedBarna=b;
                this.editmode=false;
                alert("Created successfully");
            })
        }
        catch(error){
            console.log(error);
        }
    }
    updateBarna=async(b:Barna)=>{
        try{
           await agent.Barnat.update(b);
           runInAction(()=>{
           
            this.BarnatRegistry.set(b.barnat_Id,b)
             this.selectedBarna=b;
             this.editmode=false;
             alert("Updated successfully");
           })
        }
        catch(error){
            console.log(error);
        }
    }
    deleteBarna=async(id:string)=>{
        try{
            
           await agent.Barnat.delete(id);
           runInAction(()=>{
            
            this.BarnatRegistry.delete(id);
            ;if(this.selectedBarna?.barnat_Id==id)this.canceleSelectedBarna();

           })
        
        }
        catch(error){
            console.log(error);
        }
    }
}