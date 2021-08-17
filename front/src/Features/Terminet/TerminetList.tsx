import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect } from "react";
import { useState } from "react";

import { Link, RouteComponentProps, useParams } from "react-router-dom";
import { Button, Grid, Header, Icon, Item, Modal, Segment } from "semantic-ui-react";
import { history } from "../..";
import { useStoreTerminet } from "../../app/stores/store";
import { TerminatForm } from "./TerminatForm";
import TerminetDetails from "./TerminetDetails";
import TerminatTable from "./TerminatTable";
import "./t.css";


export default observer( function TerminetList () {
    const {TerminetStore}=useStoreTerminet();
    const{terminet,selectTermini,openForm,deleteTermini,withId,getTerminetwithId,nr,selectedTermini}=TerminetStore;
    const [open, setOpen] = React.useState(false)
    const {id}=useParams<{id:string}>();
    const [i,seti]=useState(1);
    const [v,setV]=useState(0);

    

    useEffect(()=>{
        TerminetStore.loadTerminet();
       //if(id) getTerminetwithId(id);
       setV(v+1);
      
    },[TerminetStore,id,withId]);
console.log(withId);
  

   
    function handleDelete( id: string){
        
        deleteTermini(id);
        setOpen(false);
    }
    function del(id:string){
        selectTermini(id);
        setOpen(true);
    }

    
    
    return (
     <div className="tcontainer">
      <TerminatTable/>

     </div>
       
    )

}
)
