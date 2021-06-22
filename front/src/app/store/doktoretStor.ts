
import agent from "../api/agent";
import { IDoktori } from "../models/Doktori";
import {v4 as uuid} from 'uuid';
import { makeAutoObservable, runInAction } from "mobx";

export default class DoktoretStore{
    //pacientat:IPacienti[]=[];
    selectedDoktori:IDoktori | undefined=undefined;
    editmode=false;
    doktoratRegistry=new Map<string,IDoktori>()
    constructor(){
        makeAutoObservable(this)
    }
    loadDoktorat= async ()=>{
       try{
        const doktorat=await agent.doktoret.list();
        runInAction(()=>{
            
            doktorat.forEach(doktori=>{
                doktori.ditlindja=new Date(doktori.ditlindja!)
                this.doktoratRegistry.set(doktori.mjeku_Id,doktori);
        })
        
        })
       }
       catch(error){
           console.log(error);
       }
    }
    get doktorat(){
        return Array.from(this.doktoratRegistry.values());
    }
    selectDoktori=(id:string)=>{
      this.selectedDoktori=this.doktoratRegistry.get(id);
    }
    canceleSelectedDoktori=()=>{
        this.selectedDoktori=undefined;
    }
    openForm=(id?:string)=>{
        id? this.selectDoktori(id) : this.canceleSelectedDoktori();
        this.editmode=(true);
    }
    closeForm=()=>{
        this.editmode=false;
    }
    createDoktori=async(Doktori :IDoktori)=>{
        Doktori.mjeku_Id=uuid();
        try{
            await agent.doktoret.create(Doktori);
            runInAction(()=>{
                this.doktoratRegistry.set(Doktori.mjeku_Id,Doktori);
                this.selectedDoktori=Doktori;
                this.editmode=false;
                alert("Created successfully");
            })
        }
        catch(error){
            console.log(error);
        }
    }
    updateDoktori=async(Doktori:IDoktori)=>{
        try{
           await agent.doktoret.update(Doktori);
           runInAction(()=>{
            // this.pacientat=[...this.pacientat.filter(a => a.pacient_Id !== Pacienti.pacient_Id),Pacienti];
            this.doktoratRegistry.set(Doktori.mjeku_Id,Doktori)
             this.selectedDoktori=Doktori;
             this.editmode=false;
             alert('Updated Successfully');
           })
        }
        catch(error){
            console.log(error);
        }
    }
    deleteDoktori=async(id:string)=>{
        try{
            if(window.confirm('Are you sure')){
           await agent.doktoret.delete(id);
           runInAction(()=>{
            //this.pacientat=[...this.pacientat.filter(a => a.pacient_Id !== id)]
            this.doktoratRegistry.delete(id);
            ;if(this.selectedDoktori!.mjeku_Id==id)this.canceleSelectedDoktori();

           })
        }
        }
        catch(error){
            console.log(error);
        }
    }
    getDepartmentet = async() => {
        try{
            const Department = await agent.Departmentet.list();
           /* Doktorat.forEach(Doktori => {
                    this.Dokktoret.push(Doktori);
                })*/
                return Department;
        } catch(error){
            console.log(error);
        }
    }
}
