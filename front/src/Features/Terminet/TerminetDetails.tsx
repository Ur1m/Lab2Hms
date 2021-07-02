import { rejects } from "assert";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { Button, ButtonGroup, Card } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { IPacienti } from "../../app/models/IPacienti";
import { useStoreDoktorat, useStorePacientat, useStoreTerminet } from "../../app/stores/store";

export default observer( function PacentatDetails () {

    const {TerminetStore}=useStoreTerminet();
    const{selectedTermini}=TerminetStore
    const {PacientatStore}=useStorePacientat();
    const{selectedPacienti,selectPacineti}=PacientatStore;
    const {DoktoratStore}=useStoreDoktorat();
    const{doktorat,selectedDoktori,closeForm,selectDoktori}=DoktoratStore;
    
   const{id}=useParams<{id:string}>();

   
   
    useEffect(()=>{
      TerminetStore.pacienti(selectedTermini!.pacient_Id)
      TerminetStore.doktori(selectedTermini!.mjeku_Id)
    },[TerminetStore]);
    
    

      return (
          <Card fluid>
            
       
 
      
      <Card.Content>
     
        
        <Card.Description>{"Pacineti :"+TerminetStore.pacientiemri}</Card.Description>
        
        <Card.Description>
          {"Mjeku:"+TerminetStore.DoktoriEmri}
        </Card.Description>
        <Card.Description>
          {"Orari :"+selectedTermini?.orari?.getDate()+"/"+selectedTermini?.orari?.getMonth()+"/"+selectedTermini?.orari?.getFullYear()+"--"+selectedTermini?.orari?.getHours()+":"+selectedTermini?.orari?.getMinutes()}
        </Card.Description>
       
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          { !id && <Button onClick={()=>TerminetStore.openForm(selectedTermini!.termini_ID)}basic color='blue' content="Edit"/>}
            <Button  onClick={()=>TerminetStore.canceleSelectedTermini()}basic color='grey' content="Cancele"/>
        </ButtonGroup>
      </Card.Content>
    </Card>
      )
  }
  );




  