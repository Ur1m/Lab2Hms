import { action, observable,configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IDoktori } from "../Models/Doktori";
configure({enforceActions:'always'});

class DokoretStore{

    @observable doktoretRegistry=new Map();
@observable doktoret:IDoktori[]=[];
@observable selectedDoktori:IDoktori | null=null;
@observable editMode=false;
@observable loading=false;
@observable submmitting=false;
@observable target='';

@action loadDoktoret = async()=>{
    try{
        const doktorett=await agent.doktoret.list();
        runInAction(()=>{
            doktorett.forEach((doktori)=>{
                doktori.ditlindja=doktori.ditlindja.split('.')[0];
                this.doktoretRegistry.set(doktori.mjeku_Id,doktori);
        })
        

   /* agent.doktoret.list().then(dok =>{
        dok.forEach((doktori)=>{
            doktori.ditlindja=doktori.ditlindja.split('.')[0];
            this.doktoret.push(doktori);*/
        });
    }
        catch(error){
            console.log(error);
        }
        
        
    };
    @action createDoktori= async(Doktori :IDoktori)=>{
this.submmitting=true;
try{
    await agent.doktoret.create(Doktori);
    runInAction(()=>{
        this.doktoretRegistry.set(Doktori.mjeku_Id,Doktori);
        this.editMode=false;
        this.submmitting=false;
    })
 

}
catch(error){
    runInAction(()=>{
        this.submmitting=false;
 console.log(error);
    })
 
}
    }
    @action editDoktori= async (doktori :IDoktori)=>{
        this.submmitting=true;
        try{
            await  agent.doktoret.update(doktori);
            runInAction( () => {
                this.doktoretRegistry.set(doktori.mjeku_Id,doktori)
                this.selectedDoktori=doktori;
                this.editMode=false;
                this.submmitting=false;

            })
           
        }
        catch(error){
            runInAction(()=>{
                console.log(error);
                this.editMode=false;
                this.submmitting=false;

            })
            
        }

    }
    @action cleareDoktorin(){
        this.selectedDoktori=null;
    }
    @action opereditform=(id:string)=>{
        this.selectedDoktori=this.doktoretRegistry.get(id);
    }
    @action opencreateForm =() =>{
        this.editMode=true;
        this.selectedDoktori=null;
    }
    @action canceleSelectedDoktori=()=>{
        this.selectedDoktori=null;
    }
    @action canceleFormOpen=()=>{
        this.editMode=false;
    }
    @action loadDoktorin= async (id:string)=>{
       let doktori=this.getDoktorin(id);
       if(doktori){
           this.selectedDoktori=doktori;
//selectedDoktori as Doktori
       }
       else{
           try{
               doktori= await agent.doktoret.details(id);
               runInAction(()=>{
                   this.selectedDoktori=doktori;
               })
           }
           catch(error){
               console.log(error);
           }
       }
    }
    getDoktorin(id:string){
       return this.doktoretRegistry.get(id);
    }

@action selectDoktori =(id:string)=>{
    this.selectedDoktori=this.doktoretRegistry.get(id);
    this.editMode=false;
}
@action deleteDoktori=async(event:SyntheticEvent<HTMLButtonElement>,id:string)=>{
this.submmitting=true;
this.target=event.currentTarget.name;
try{
 await agent.doktoret.delete(id);
 runInAction(()=>{
    this.doktoretRegistry.delete(id);
    this.submmitting=false;
    this.target='';
 })

}
catch(error){
    runInAction(()=>{
        this.submmitting=false;
        this.target='';
        console.log(error);
    })
  

}
}
}
export default createContext(new DokoretStore());