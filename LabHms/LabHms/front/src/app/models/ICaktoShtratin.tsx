import { IPacienti } from "./IPacienti";
import { IShtrat } from "./IShtrat";

export interface ICaktoShtratin{
    caktoShtratin_id:string;
    kohahyrjes?:Date | null;
    kohaleshimit?:Date | null;
    pacient_id:string;
    pacient?: IPacienti;
    shtrat_id:string;
    shtrat?:IShtrat;
}