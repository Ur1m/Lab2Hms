import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import DepartmentStore from "./departmentStore";

interface Store {
    departmentStore: DepartmentStore;
    commonStore: CommonStore;
}
export const store: Store = {
    departmentStore: new DepartmentStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}