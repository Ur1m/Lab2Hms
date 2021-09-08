import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DepartmentStore from "./departmentStore";
import InfermierjaStore from "./infermierjaStore";
import PacientatStore from "../store/PacientatStore";
import DoktoretStore from "../store/doktoretStor";
import FaturaStore from "./FaturaStore";
import TerminetStore from "../store/TerminetStore";
import LlojiShtratitStore from "./llojiShtratitStore";
import ShtratStore from "./shtratStore";
import CaktoShtratinStore from "./caktoShtratinStore";
import PaisjetStore from "../store/PaisjetStore";
import DhomaStore from "./dhomaStore";
import BarnatStore from "../store/BarnatStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import TherapyStore from "../store/TherapyStore";
import RaportStore from "../store/RaportStore";

interface Store {
    departmentStore: DepartmentStore;
    commonStore: CommonStore;
    faturaStore: FaturaStore;
    shtratStore: ShtratStore;
    llojiShtratitStore: LlojiShtratitStore;
    caktoShtratinStore: CaktoShtratinStore;
    infermierjaStore: InfermierjaStore;
    dhomaStore: DhomaStore;
    userStore: UserStore;
    modalStore: ModalStore;
    
}

export const store: Store = {
    departmentStore: new DepartmentStore(),
    commonStore: new CommonStore(),
    faturaStore: new FaturaStore(),
    shtratStore: new ShtratStore(),
    llojiShtratitStore: new LlojiShtratitStore(),
    caktoShtratinStore: new CaktoShtratinStore(),
    infermierjaStore: new InfermierjaStore(),
    dhomaStore: new DhomaStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
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
interface StoreTherapies{
    TherapyStore:TherapyStore;
}
export const StoreTherapies:StoreTherapies={
    TherapyStore:new TherapyStore()
}
export const StoreContextTherapies=createContext(StoreTherapies);
export function useStoreTherapies(){
    return useContext(StoreContextTherapies);


}

interface StoreRaport{
    RaportStore:RaportStore;
}
export const StoreRaport:StoreRaport={
    RaportStore:new RaportStore()
}
export const StoreContextRaport=createContext(StoreRaport);
export function useStoreRaport(){
    return useContext(StoreContextRaport);


}

interface StoreBarnat{
    BarnatStore:BarnatStore;

}
export const StoreBarnat:StoreBarnat={
    BarnatStore:new BarnatStore()
}
export const StoreContextBarna=createContext(StoreBarnat)
export function useStoreBarnat(){
    return useContext(StoreContextBarna);
}


interface StoreFatura{
    FaturatStore:FaturaStore;

}
export const StoreFaturat:StoreFatura={
    FaturatStore:new FaturaStore()
}
export const StoreContextFatura=createContext(StoreFaturat)
export function useStoreFaturat(){
    return useContext(StoreContextFatura);
}