import { useState } from "react";

export interface IDoktori
{
    mjeku_Id:string ;
    emri:string;
    mbimeri:string;
     ditlindja?:Date | null;
     specializimi:string;
     depName:string;
}

/*export class  DoktoriValues implements IDoktori{
    mjeku_Id:string='';
    emri:string='';
    mbimeri:string='';
     ditlindja:string='';
     specializimi:string='';
     depName:string='';

     constructor(init?:DoktoriValues){
         if(init  ){}
         Object.assign(this,init);
     }

}
const [doktori,setdoktori]=useState(new DoktoriValues() )*/;
