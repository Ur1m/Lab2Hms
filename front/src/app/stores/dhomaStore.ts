import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import { IDhoma } from "../models/IDhoma";

export default class DhomaStore {
    Dhomat: IDhoma[] = [];
    selectedDhoma: IDhoma | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    loadDhomat = async () => {
        this.setLoadingInitial(true);
        try{
            const Dhomat = await agent.Dhomat.list();
                Dhomat.forEach(Dhoma => {
                    this.Dhomat.push(Dhoma);
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

    selectDhoma = (dhoma_id: string) => {
        this.selectedDhoma = this.Dhomat.find(dh => dh.dhoma_id === dhoma_id);
    }


    cancelSelectedDhoma = () => {
        this.selectedDhoma = undefined;
    }

    openForm = (dhoma_id?: string) => {
        dhoma_id? this.selectDhoma(dhoma_id) : this.cancelSelectedDhoma();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createDhoma = async (Dhoma: IDhoma) => {
        this.loading = true;
        Dhoma.dhoma_id = uuid();
        try{
            await agent.Dhomat.create(Dhoma);
            runInAction(() => {
                this.Dhomat.push(Dhoma);
                this.selectedDhoma = Dhoma;
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

    updateDhoma = async (Dhoma: IDhoma) => {
        this.loading = true;
        try{
            await agent.Dhomat.update(Dhoma);
            runInAction(() => {
                this.Dhomat = [...this.Dhomat.filter(dh => dh.dhoma_id !== Dhoma.dhoma_id), Dhoma];
                this.selectedDhoma = Dhoma;
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

    deleteDhoma = async (dhoma_id: string) => {
        this.loading = true;
        try{
            await agent.Dhomat.delete(dhoma_id);
            runInAction(() => {
                this.Dhomat = [...this.Dhomat.filter(dh => dh.dhoma_id !== dhoma_id)];
                if (this.selectedDhoma?.dhoma_id === dhoma_id) this.cancelSelectedDhoma();
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}