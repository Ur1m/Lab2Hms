import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DepartmentStore from "./departmentStore";
import PacientatStore from "../store/PacientatStore";
import DoktoretStore from "../store/doktoretStor";
import FaturaStore from "./faturaStore";

interface Store {
    departmentStore: DepartmentStore;
    commonStore: CommonStore;
    faturaStore: FaturaStore
}
export const store: Store = {
    departmentStore: new DepartmentStore(),
    commonStore: new CommonStore(),
    faturaStore: new FaturaStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}


interface StorePacientat{
    PacientatStore:PacientatStore;
}

export const StorePacientat:StorePacientat={
    PacientatStore:new PacientatStore()
}

export const StoreContextPacientat=createContext(StorePacientat);


export function useStorePacientat(){
    return useContext(StoreContextPacientat);
}
interface StoreDoktorat{
    DoktoratStore:  DoktoretStore;
}
export const StoreDoktorat:StoreDoktorat={
    DoktoratStore:new DoktoretStore()
}
export const StoreContextDoktorat=createContext(StoreDoktorat);

export function useStoreDoktorat(){
    return useContext(StoreContextDoktorat);
}
