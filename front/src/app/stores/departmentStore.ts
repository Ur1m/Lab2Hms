import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IDepartment } from "../models/IDepartment";
import {v4 as uuid} from 'uuid';

export default class DepartmentStore {
    Departmentet: IDepartment[] = [];
    selectedDepartment: IDepartment | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    loadDepartamentet = async () => {
        this.setLoadingInitial(true);
        this.Departmentet = [];
        try{
            const Departmentet = await agent.Departmentet.list();
                Departmentet.forEach(Department => {
                    this.Departmentet.push(Department);
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

    selectDepartment = async(department_id: string) => {
        this.selectedDepartment = await agent.Departmentet.details(department_id);
    }


    cancelSelectedDepartment = () => {
        this.selectedDepartment = undefined;
    }

    openForm = (department_id?: string) => {
        department_id? this.selectDepartment(department_id) : this.cancelSelectedDepartment();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createDepartment = async (Department: IDepartment) => {
        this.loading = true;
        Department.department_id = uuid();
        try{
            await agent.Departmentet.create(Department);
            runInAction(() => {
                this.Departmentet.push(Department);
                this.selectedDepartment = Department;
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

    updateDepartment = async (Department: IDepartment) => {
        this.loading = true;
        try{
            await agent.Departmentet.update(Department);
            runInAction(() => {
                this.Departmentet = [...this.Departmentet.filter(d => d.department_id !== Department.department_id), Department];
                this.selectedDepartment = Department;
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

    deleteDepartment = async (department_id: string) => {
        this.loading = true;
        try{
            await agent.Departmentet.delete(department_id);
            runInAction(() => {
                this.Departmentet = [...this.Departmentet.filter(d => d.department_id !== department_id)];
                if (this.selectedDepartment?.department_id === department_id) this.cancelSelectedDepartment();
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