import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ILaboratori } from "../models/ILaboratori";
import {v4 as uuid} from 'uuid';
import { IDepartment } from "../models/IDepartment";


export default class LaboratoriStore {
    Laboratort: ILaboratori[] = [];
    selectedLaborator: ILaboratori | undefined = undefined;
    editMode = false;
    detailsmode=false;
    loading = false;
    loadingInitial = false;
    Departmentet: IDepartment[] =[];

    constructor(){
        makeAutoObservable(this)
    }

    loadLaboratoret = async () => {
        this.setLoadingInitial(true);
        this.Laboratort = [];
        try{
            const Laboratoret = await agent.Laboratort.list();
            Laboratoret.forEach(Laboratori => {
                    this.Laboratort.push(Laboratori);
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

    selectLaboratori = async(lab_Id: string) => {
        this.selectedLaborator = await agent.Laboratort.details(lab_Id);
    }


    cancelSelectedLaborator = () => {
        this.selectedLaborator = undefined;
    }

    openForm = (lab_Id?: string) => {
        lab_Id? this.selectLaboratori(lab_Id) : this.cancelSelectedLaborator();
        this.editMode = (true);
    }

    closeForm = () => {
        this.editMode = false;
    }
    openDetails=(id:string)=>{
        this.selectLaboratori(id);
        this.detailsmode=true;
    }
    closeDetails=()=>{
        this.detailsmode=false;
    }

    createLaborator = async (Laboratori: ILaboratori) => {
        this.loading = true;
        Laboratori.lab_Id = uuid();
        try{
            await agent.Laboratort.create(Laboratori);
            runInAction(() => {
                this.Laboratort.push(Laboratori);
                this.selectedLaborator = Laboratori;
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

    updateLaborator = async (Laboratori: ILaboratori) => {
        this.loading = true;
        try{
            await agent.Laboratort.update(Laboratori);
            runInAction(() => {
                this.Laboratort = [...this.Laboratort.filter(d => d.lab_Id !== Laboratori.lab_Id), Laboratori];
                this.selectedLaborator = Laboratori;
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

    deleteLaborator = async (lab_Id: string) => {
        this.loading = true;
        try{
            await agent.Laboratort.delete(lab_Id);
            runInAction(() => {
                this.Laboratort = [...this.Laboratort.filter(d => d.lab_Id !== lab_Id)];
                if (this.selectedLaborator?.lab_Id === lab_Id) this.cancelSelectedLaborator();
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