import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IFatura } from "../models/IFatura";
import {v4 as uuid} from 'uuid';
import { IPacienti } from "../models/IPacienti";

export default class FaturaStore {
    //Faturat: IFatura[] = [];
    selectedFatura: IFatura | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    detailsmode=false;
    faturatRegistry=new Map<string,IFatura>()
    forma=false;

    constructor(){
        makeAutoObservable(this)
    }

    loadFaturat = async () => {
        this.setLoadingInitial(true);
        //this.Faturat = [];
        try{
            const Faturat = await agent.Faturat.list();
            runInAction(()=>{
                Faturat.forEach(Fatura => {
                    //this.Faturat.push(Fatura);
                    this.faturatRegistry.set(Fatura.fatura_Id,Fatura);
                })
                this.setLoadingInitial(false);
            })
        } catch(error){
            console.log(error);
                this.setLoadingInitial(true);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    get Faturat(){
        return Array.from(this.faturatRegistry.values());
    }
    
    selectFatura = async (fatura_id: string) => {
        this.selectedFatura = this.faturatRegistry.get(fatura_id);
    }


    cancelSelectedFatura = () => {
        this.selectedFatura = undefined;
    }

    openForm = (fatura_id?: string) => {
        fatura_id? this.selectFatura(fatura_id) : this.cancelSelectedFatura();
        this.editMode = true;
    }

    closeForm=()=>{
        this.editMode=false;
    }

    openDetails=(id:string)=>{
        this.selectFatura(id);
        this.detailsmode=true;
    }
    closeDetails=()=>{
        this.selectedFatura=undefined;
        this.detailsmode=false;
    }

    createFatura = async (Fatura: IFatura) => {
        this.loading = true;
        Fatura.fatura_Id = uuid();
        try{
            await agent.Faturat.create(Fatura);
            runInAction(() => {
                //this.Faturat.push(Fatura);
                this.faturatRegistry.set(Fatura.fatura_Id,Fatura);
                this.selectedFatura = Fatura;
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

    updateFatura = async (Fatura: IFatura) => {
        this.loading = true;
        try{
            await agent.Faturat.update(Fatura);
            runInAction(() => {
                //this.Faturat = [...this.Faturat.filter(f => f.fatura_Id !== Fatura.fatura_Id), Fatura];
                this.faturatRegistry.set(Fatura.fatura_Id,Fatura);
                this.selectedFatura = Fatura;
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

    deleteFatura = async (fatura_id: string) => {
        this.loading = true;
        try{
            await agent.Faturat.delete(fatura_id);
            runInAction(() => {
                //this.Faturat = [...this.Faturat.filter(f => f.fatura_Id !== fatura_id)];
                this.faturatRegistry.delete(fatura_id);
                if (this.selectedFatura?.fatura_Id === fatura_id) this.cancelSelectedFatura();
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
}