import { createContext, useContext } from "react";
import DepartmentStore from "./departmentStore";
import InfermierjaStore from "./infermierjaStore";

interface Store {
    departmentStore: DepartmentStore,
    infermierjaStore: InfermierjaStore
}
export const store: Store = {
    departmentStore: new DepartmentStore(),
    infermierjaStore: new InfermierjaStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}