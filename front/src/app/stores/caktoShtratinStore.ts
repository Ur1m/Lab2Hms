import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import { ICaktoShtratin } from "../models/ICaktoShtratin";
import { IPacienti } from "../models/IPacienti";
import { IShtrat } from "../models/IShtrat";

export default class CaktoShtratinStore {
    caktoShtreterit: ICaktoShtratin[] = [];
    selectedCaktoShtratin: ICaktoShtratin | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    loadcaktoShtreterit = async () => {
        this.setLoadingInitial(true);
        this.caktoShtreterit = [];
        try{
            const caktoShtreterit = await agent.caktoShtreterit.list();
                caktoShtreterit.forEach(caktoShtratin => {
                    this.caktoShtreterit.push(caktoShtratin);
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

    selectCaktoShtratin = async(caktoShtratin_id: string) => {
        this.selectedCaktoShtratin = await agent.caktoShtreterit.details(caktoShtratin_id);
    }


    cancelCaktoShtratin = () => {
        this.selectedCaktoShtratin = undefined;
    }

    openForm = (caktoShtratin_id?: string) => {
        caktoShtratin_id? this.selectCaktoShtratin(caktoShtratin_id) : this.cancelCaktoShtratin();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createCaktoShtratin = async (caktoShtratin: ICaktoShtratin) => {
        this.loading = true;
        caktoShtratin.caktoShtratin_id = uuid();
        try{
            await agent.caktoShtreterit.create(caktoShtratin);
            runInAction(() => {
                this.caktoShtreterit.push(caktoShtratin);
                this.selectedCaktoShtratin = caktoShtratin;
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

    updateCaktoShtratin = async (CaktoShtratin: ICaktoShtratin) => {
        this.loading = true;
        try{
            await agent.caktoShtreterit.update(CaktoShtratin);
            runInAction(() => {
                this.caktoShtreterit = [...this.caktoShtreterit.filter(csh => csh.caktoShtratin_id !== CaktoShtratin.caktoShtratin_id), CaktoShtratin];
                this.selectedCaktoShtratin = CaktoShtratin;
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

    deleteCaktoShtratin = async (caktoShtratin_id: string) => {
        this.loading = true;
        try{
            await agent.caktoShtreterit.delete(caktoShtratin_id);
            runInAction(() => {
                this.caktoShtreterit = [...this.caktoShtreterit.filter(csh => csh.caktoShtratin_id !== caktoShtratin_id)];
                if (this.selectedCaktoShtratin?.caktoShtratin_id === caktoShtratin_id) this.cancelCaktoShtratin();
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    Pacientat: IPacienti[] =[];

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

    Shtreter: IShtrat[] =[];

    getShtreter = async() => {
        try{
            const Shtreter = await agent.Shtreter.list();
                Shtreter.forEach(Shtrati => {
                    this.Shtreter.push(Shtrati);
                })
                return Shtreter;
        } catch(error){
            console.log(error);
        }
    }
}