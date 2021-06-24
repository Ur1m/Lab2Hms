import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ITerminet } from "../models/Terminet";
import {v4 as uuid} from 'uuid';
import { IPacienti } from "../models/IPacienti";
import { IDepartment } from "../models/IDepartment";

export default class TerminetStore{
    selectedTermini:ITerminet | undefined=undefined;
    editmode=false;
    TerminetRegistry=new Map<string,ITerminet>()
    pacientiemri="";
    DoktoriEmri="";
    Pacientat: IPacienti[] =[];
    withId:ITerminet []=[];
    nr:number=0;
    
   
    constructor(){
        makeAutoObservable(this)
    }
    loadTerminet= async ()=>{
       try{
        const terminat=await agent.Terminet.list();
        runInAction(()=>{
            terminat.forEach(termini=>{
                termini.orari=new Date(termini.orari!);
                this.TerminetRegistry.set(termini.termini_ID,termini);
        })
        
        })
       }
       catch(error){
           console.log(error);
       }
    }
    get terminet(){
        return Array.from(this.TerminetRegistry.values());
    }
    getTerminetwithId= async(id:string)=>{
           
        const terminatid = await agent.Terminet.list();
        runInAction(()=>{
          terminatid.filter(valt=>{
             if(valt.pacient_Id==id || valt.mjeku_Id==id){
                this.withId.push(valt);
               this. nr++;
               
             }
          })
        })
      }
    selectTermini=(id:string)=>{
      this.selectedTermini=this.TerminetRegistry.get(id);
    }
    canceleSelectedTermini=()=>{
        this.selectedTermini=undefined;
    }
    openForm=(id?:string)=>{
        id? this.selectTermini(id) : this.canceleSelectedTermini();
        this.editmode=(true);
    }
    closeForm=()=>{
        this.editmode=false;
    }
    createTermini=async(termini :ITerminet)=>{
        termini.termini_ID=uuid();
        try{
            await agent.Terminet.create(termini);
            runInAction(()=>{
                this.TerminetRegistry.set(termini.termini_ID,termini);
                this.selectedTermini=termini;
                this.editmode=false;
                alert("Created successfully");
            })
        }
        catch(error){
            console.log(error);
        }
    }
    updateTermini=async(Termini:ITerminet)=>{
        try{
           await agent.Terminet.update(Termini);
           runInAction(()=>{
         
            this.TerminetRegistry.set(Termini.termini_ID,Termini)
             this.selectedTermini=Termini;
             this.editmode=false;
             alert("Updated successfully");
           })
        }
        catch(error){
            console.log(error);
        }
    }
    deleteTermini=async(id:string)=>{
        try{
           
           await agent.Terminet.delete(id);
           runInAction(()=>{
           
            this.TerminetRegistry.delete(id);
            ;if(this.selectedTermini?.termini_ID==id)this.canceleSelectedTermini();

           })
        }
        
        catch(error){
            console.log(error);
        }
        
    }
    pacienti=async(id:string)=>{
      await agent.Pacientat.details(id).then(val=>{
          this.pacientiemri=val.emri;
      });
    }
      doktori=async(id:string)=>{
        await agent.doktoret.details(id).then(val=>{
            this.DoktoriEmri=val.emri;
        });
        
        
           
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

    getDoktoret = async() => {
        try{
            const Doktorat = await agent.doktoret.list();
           /* Doktorat.forEach(Doktori => {
                    this.Dokktoret.push(Doktori);
                })*/
                return Doktorat;
        } catch(error){
            console.log(error);
        }
    }
   

}
