import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IAmbulanca } from "../models/IAmbulanca";
import {v4 as uuid} from 'uuid';
import { IDepartment } from "../models/IDepartment";


export default class AmbulancaStore {
    Ambulancat: IAmbulanca[] = [];
    selectedAmbulanca: IAmbulanca | undefined = undefined;
    editMode = false;
    detailsmode=false;
    loading = false;
    loadingInitial = false;
    Departmentet: IDepartment[] =[];

    constructor(){
        makeAutoObservable(this)
    }

    loadAmbulancat = async () => {
        this.setLoadingInitial(true);
        this.Ambulancat = [];
        try{
            const Ambulancat = await agent.Ambulancat.list();
            Ambulancat.forEach(Ambulanca => {
                    this.Ambulancat.push(Ambulanca);
                })
                this.setLoadingInitial(false);
        } catch(error){
            console.log(error);
                this.setLoadingInitial(true);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectAmbulancat = async(amb_Id: string) => {
        this.selectedAmbulanca = await agent.Ambulancat.details(amb_Id);
    }


    cancelSelectedAmbulancat = () => {
        this.selectedAmbulanca = undefined;
    }

    openForm = (amb_Id?: string) => {
        amb_Id? this.selectAmbulancat(amb_Id) : this.cancelSelectedAmbulancat();
        this.editMode = (true);
    }

    closeForm = () => {
        this.editMode = false;
    }
    openDetails=(id:string)=>{
        this.selectAmbulancat(id);
        this.detailsmode=true;
    }
    closeDetails=()=>{
        this.detailsmode=false;
    }

    createAmbulancat = async (Ambulanca: IAmbulanca) => {
        this.loading = true;
        Ambulanca.amb_Id = uuid();
        try{
            await agent.Ambulancat.create(Ambulanca);
            runInAction(() => {
                this.Ambulancat.push(Ambulanca);
                this.selectedAmbulanca = Ambulanca;
                this.editMode = false;
                this.loading = false;
            })
        } catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAmbulancat = async (Ambulanca: IAmbulanca) => {
        this.loading = true;
        try{
            await agent.Ambulancat.update(Ambulanca);
            runInAction(() => {
                this.Ambulancat = [...this.Ambulancat.filter(d => d.amb_Id !== Ambulanca.amb_Id), Ambulanca];
                this.selectedAmbulanca = Ambulanca;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteAmbulancat = async (amb_Id: string) => {
        this.loading = true;
        try{
            await agent.Ambulancat.delete(amb_Id);
            runInAction(() => {
                this.Ambulancat = [...this.Ambulancat.filter(d => d.amb_Id !== amb_Id)];
                if (this.selectedAmbulanca?.amb_Id === amb_Id) this.cancelSelectedAmbulancat();
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    getDepartamentet = async() => {
        try{
            const Departmentet = await agent.Departmentet.list();
            Departmentet.forEach(Department => {
                    this.Departmentet.push(Department);
                })
                return Departmentet;
        } catch(error){
            console.log(error);
        }
    }
}