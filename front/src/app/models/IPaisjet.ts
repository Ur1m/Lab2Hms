export interface IPaisjet{
    paisja_Id:string;
    emertimi:string;
    pershkrimi:string;
    servisimi:Date | null;
    department_Id:string;
    image:string;
   


}
export interface IPaisjetDropDown{
    key:any;
    text: any;
    value: any;
}