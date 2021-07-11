import { IPacienti } from "./IPacienti";

export interface IFatura{
    fatura_Id:string;
    titulli:string;
    pershkrimi:string;
    shuma:number | null;
    krijuarme?:Date | null;
    statusi:string;
    pacient_id:string;
    pacient?: IPacienti;
}