import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DepartmentStore from "./departmentStore";
import PacientatStore from "../store/PacientatStore";
import DoktoretStore from "../store/doktoretStor";
import FaturaStore from "./faturaStore";
import TerminetStore from "../store/TerminetStore";
import LlojiShtratitStore from "./llojiShtratitStore";
import ShtratStore from "./shtratStore";
import CaktoShtratinStore from "./caktoShtratinStore";
import PaisjetStore from "../store/PaisjetStore";

interface Store {
    departmentStore: DepartmentStore;
    commonStore: CommonStore;
    faturaStore: FaturaStore;
    shtratStore: ShtratStore;
    llojiShtratitStore: LlojiShtratitStore;
    caktoShtratinStore: CaktoShtratinStore
}
export const store: Store = {
    departmentStore: new DepartmentStore(),
    commonStore: new CommonStore(),
    faturaStore: new FaturaStore(),
    shtratStore: new ShtratStore(),
    llojiShtratitStore: new LlojiShtratitStore(),
    caktoShtratinStore: new CaktoShtratinStore()
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
interface StoreTerminet{
    TerminetStore:TerminetStore;
}
export const StoreTerminet:StoreTerminet={
    TerminetStore:new TerminetStore()
}
export const StoreContextTerminet=createContext(StoreTerminet);
export function useStoreTerminet(){
    return useContext(StoreContextTerminet);
}
interface StorePaisjet{
    PaisjetStore:PaisjetStore;
}
export const StorePaisjet:StorePaisjet={
    PaisjetStore:new PaisjetStore()
}
export const StoreContextPaisjet=createContext(StorePaisjet);
export function useStorePaisjet(){
    return useContext(StoreContextPaisjet);
}
