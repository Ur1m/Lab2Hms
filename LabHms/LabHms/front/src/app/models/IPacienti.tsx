export interface IPacienti{
    pacient_Id:string ;
    emri:string;
    mbimeri:string;
    adresa:string;
    qyteti:string;
     ditlindja?:Date | null;
     grupigjakut:string;

}


export interface IPacientetDropDown{
    key:any;
    text: any;
    value: any;
}

