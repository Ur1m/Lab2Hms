import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Infermierja } from "../models/Infermierja";

export default class InfermierjaStore{


    infermieret: Infermierja[]=[];
    infermierjaRegistry=new Map<string,Infermierja>();
    
    selectedInfermierja: Infermierja| undefined=undefined;
    editMode=false;
    loading=false;
    loadingInitial=true;

    constructor(){
        makeAutoObservable(this)
    }

   
    
    loadInfermieret= async ()=>{
        this.loadingInitial=true;
        try{
            const infermieret = await agent.Infermieret.list();
                    infermieret.forEach(infermierja=>{
                         this.setInfermierja(infermierja);
                    })
                this.setLoadingInitial(false);
        } catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }


    loadInfermierja=async (infermierja_id: string)=>
    {
        let infermierja=this.getInfermierja(infermierja_id);
        if(infermierja){
            this.selectedInfermierja=infermierja;
            return infermierja;
        }
        else{
            this.loadingInitial=true;
            try{
                infermierja=await agent.Infermieret.details(infermierja_id);
                this.setInfermierja(infermierja);
                runInAction(()=>{
                    this.selectedInfermierja= infermierja;
                })
                
                this.setLoadingInitial(false);
                return infermierja;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setInfermierja=(infermierja:Infermierja)=>{
        this.infermierjaRegistry.set(infermierja.infermierja_id, infermierja);

    }

    private getInfermierja=(infermierja_id: string)=>{
        return this.infermierjaRegistry.get(infermierja_id);
    }

    setLoadingInitial=(state: boolean)=>{
        this.loadingInitial=state;
    }

    
    createInfermierja=async (infermierja: Infermierja)=>{
        this.loading=true;
        try{
            await agent.Infermieret.create(infermierja);
            runInAction(()=>{
                this.infermierjaRegistry.set(infermierja.infermierja_id, infermierja);
                this.selectedInfermierja=infermierja;
                this.editMode=false;
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }

    }
    updateInfermierja=async (infermierja:Infermierja)=>{
        this.loading=true;
        try{
            await agent.Infermieret.update(infermierja);
            runInAction(()=>{
               this.infermierjaRegistry.set(infermierja.infermierja_id, infermierja);
              this.selectedInfermierja=infermierja;
              this.editMode=false;
              this.loading=false; 
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    deleteInfermierja=async(infermierja_id: string)=>{
        this.loading=true;
        try{
            await agent.Infermieret.delete(infermierja_id);
            runInAction(()=>{
                this.infermierjaRegistry.delete(infermierja_id);
                this.loading=false;
            })
        }catch(error){
            console.log(error);
            runInAction(()=>{

                this.loading=false;
            })
        }
    }
}

