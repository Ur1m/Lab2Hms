import { createContext, useContext } from "react";
import DepartmentStore from "./departmentStore";

interface Store {
    departmentStore: DepartmentStore
}
export const store: Store = {
    departmentStore: new DepartmentStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}