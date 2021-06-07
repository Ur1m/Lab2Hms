export interface IFatura{
    fatura_id:string;
    titulli:string;
    pershkrimi:string;
    shuma:number | null;
    krijuarme?:Date | null;
    statusi:string;
    pacienti_id:string;
}