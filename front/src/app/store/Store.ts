import { createContext, useContext } from "react";
import PacientatStore from "./PacientatStore";

interface Store{
    PacientatStore:PacientatStore;
}

export const store:Store={
    PacientatStore:new PacientatStore()
}

export const StoreContext=createContext(store);


export function useStore(){
    return useContext(StoreContext);
}