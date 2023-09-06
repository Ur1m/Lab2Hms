import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import { ILlojiShtratit } from "../models/ILlojiShtratit";

export default class LlojiShtratitStore {

    //llojiShtreterve: ILlojiShtratit[] = [];
    selectedLlojiShtratit: ILlojiShtratit | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    detailsmode = false;
    llojiShtratitRegistry = new Map<string,ILlojiShtratit>()

    constructor(){
        makeAutoObservable(this)
    }

    loadllojiShtreterve = async () => {
        this.setLoadingInitial(true);
        //this.llojiShtreterve = [];
        try{
            const llojiShtreterve = await agent.llojiShtreterve.list();
            runInAction(()=>{
                llojiShtreterve.forEach(llojiShtratit => {
                   // this.llojiShtreterve.push(llojiShtratit);
                   this.llojiShtratitRegistry.set(llojiShtratit.llojiShtratit_id,llojiShtratit);
                })
                this.setLoadingInitial(false);
            })
        } catch(error){
            console.log(error);
                this.setLoadingInitial(true);
        }
    }

    get llojiShtreterve(){
        return Array.from(this.llojiShtratitRegistry.values());
    }

    openDetails=(id:string)=>{
        this.selectLlojiShtratit(id);
        this.detailsmode=true;
    }
    closeDetails=()=>{
        this.detailsmode=false;
    }

    getimage=async(paisje_id:string)=>{
        var x= await agent.llojiShtreterve.details(paisje_id);
        return x.image;
     } 

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectLlojiShtratit = async(llojiShtratit_id: string) => {
        //this.selectedLlojiShtratit = await agent.llojiShtreterve.details(llojiShtratit_id);
        this.selectedLlojiShtratit = this.llojiShtratitRegistry.get(llojiShtratit_id);
    }


    cancelSelectedLlojiShtratit = () => {
        this.selectedLlojiShtratit = undefined;
    }

    openForm = (llojiShtratit_id?: string) => {
        llojiShtratit_id? this.selectLlojiShtratit(llojiShtratit_id) : this.cancelSelectedLlojiShtratit();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createLlojiShtratit = async (llojiShtratit: ILlojiShtratit) => {
        this.loading = true;
        llojiShtratit.llojiShtratit_id = uuid();
        try{
            await agent.llojiShtreterve.create(llojiShtratit);
            runInAction(() => {
                //this.llojiShtreterve.push(llojiShtratit);
                this.llojiShtratitRegistry.set(llojiShtratit.llojiShtratit_id,llojiShtratit);
                this.selectedLlojiShtratit = llojiShtratit;
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

    updateLlojiShtratit = async (llojiShtratit: ILlojiShtratit) => {
        this.loading = true;
        try{
            await agent.llojiShtreterve.update(llojiShtratit);
            runInAction(() => {
                //this.llojiShtreterve = [...this.llojiShtreterve.filter(llsh => llsh.llojiShtratit_id !== llojiShtratit.llojiShtratit_id), llojiShtratit];
                this.llojiShtratitRegistry.set(llojiShtratit.llojiShtratit_id,llojiShtratit);
                this.selectedLlojiShtratit = llojiShtratit;
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

    deleteLlojiShtratit = async (llojiShtratit_id: string) => {
        this.loading = true;
        try{
            await agent.llojiShtreterve.delete(llojiShtratit_id);
            runInAction(() => {
                //this.llojiShtreterve = [...this.llojiShtreterve.filter(llsh => llsh.llojiShtratit_id !== llojiShtratit_id)];
                this.llojiShtratitRegistry.delete(llojiShtratit_id);
                if (this.selectedLlojiShtratit?.llojiShtratit_id === llojiShtratit_id) this.cancelSelectedLlojiShtratit();
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