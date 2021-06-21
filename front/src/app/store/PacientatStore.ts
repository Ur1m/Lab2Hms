import { makeAutoObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IPacienti } from "../models/IPacienti";
import {v4 as uuid} from 'uuid';

export default class PacientatStore{
    //pacientat:IPacienti[]=[];
    selectedPacienti:IPacienti | undefined=undefined;
    editmode=false;
    pacientatRegistry=new Map<string,IPacienti>()


    constructor(){
        makeAutoObservable(this)
    }
    loadPacientat= async ()=>{
       try{
        const pacientat=await agent.Pacientat.list();
        runInAction(()=>{
            pacientat.forEach(pacineti=>{
                pacineti.ditlindja=new Date(pacineti.ditlindja!);
                this.pacientatRegistry.set(pacineti.pacient_Id,pacineti);
        })
        
        })
       }
       catch(error){
           console.log(error);
       }
    }
    get pacientat(){
        return Array.from(this.pacientatRegistry.values());
    }
    selectPacineti=(pacient_Id:string)=>{
      this.selectedPacienti=this.pacientatRegistry.get(pacient_Id);
    }
    canceleSelectedPacienti=()=>{
        this.selectedPacienti=undefined;
    }
    openForm=(pacient_Id?:string)=>{
        pacient_Id? this.selectPacineti(pacient_Id) : this.canceleSelectedPacienti();
        this.editmode=(true);
    }
    closeForm=()=>{
        this.editmode=false;
    }
    createPacineti=async(pacineti :IPacienti)=>{
        pacineti.pacient_Id=uuid();
        try{
            await agent.Pacientat.create(pacineti);
            runInAction(()=>{
                this.pacientatRegistry.set(pacineti.pacient_Id,pacineti);
                this.selectedPacienti=pacineti;
                this.editmode=false;
                alert("Created successfully");
            })
        }
        catch(error){
            console.log(error);
        }
    }
    updatePacineti=async(Pacienti:IPacienti)=>{
        try{
           await agent.Pacientat.update(Pacienti);
           runInAction(()=>{
            // this.pacientat=[...this.pacientat.filter(a => a.pacient_Id !== Pacienti.pacient_Id),Pacienti];
            this.pacientatRegistry.set(Pacienti.pacient_Id,Pacienti)
             this.selectedPacienti=Pacienti;
             this.editmode=false;
             alert("Updated successfully");
           })
        }
        catch(error){
            console.log(error);
        }
    }
    deletePacienti=async(id:string)=>{
        try{
            if(window.confirm('Are you sure')){
           await agent.Pacientat.delete(id);
           runInAction(()=>{
            //this.pacientat=[...this.pacientat.filter(a => a.pacient_Id !== id)]
            this.pacientatRegistry.delete(id);
            ;if(this.selectedPacienti?.pacient_Id==id)this.canceleSelectedPacienti();

           })
        }
        }
        catch(error){
            console.log(error);
        }
    }
}
