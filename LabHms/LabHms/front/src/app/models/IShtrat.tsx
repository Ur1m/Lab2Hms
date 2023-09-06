import { ILlojiShtratit } from "./ILlojiShtratit";

export interface IShtrat{
    shtrat_id:string;
    nrShtratit:number | null;
    statusi:string;
    pershkrimi:string;
    llojiShtratit_id:string;
    llojiShtratit?: ILlojiShtratit;
}

export interface IShtratDropDown{
    key:any;
    text: any;
    value: any;
}