import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from 'react';
import { Button, ButtonGroup, Card, Header, Image, Modal,Icon, PopupContent, PopupHeader } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreBarnat } from "../../app/stores/store";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Edit from "@material-ui/icons/Edit";
import { BarnatForm } from "./BarnatForm";
import PopUp from "../Pacineti/PopUp";
import { CardActions } from "@material-ui/core";

export default observer( function BarnatDetails ()  {

    const {BarnatStore}=useStoreBarnat();
    const{selectedBarna,selectBarna,deleteBarna,editmode,openForm}=BarnatStore
    const [open, setOpen] = React.useState(false)

    if(!selectedBarna) return <LoadingComponent/>;
    function del(id:string){
      
      setOpen(true);
    
      
  }
  function handleDelete( id: string){
          
    deleteBarna(id);
  setOpen(true);
  BarnatStore.closeDetails()
    
    BarnatStore.selectedBarna=undefined;
  }
      return (
          <Card fluid>
            <Image src={`${selectedBarna.image}`} />
      
      <Card.Content>
     
        <Card.Description>{"Emri :"+selectedBarna.bName}</Card.Description>
        
       
        <Card.Description>
          {"DataRegjistirimit :"+format(selectedBarna.dataRegjistrimit!,'MMMM d, yyyy')}.
        </Card.Description>
        <Card.Description>
          {"Pershkrimi"+selectedBarna.description}.
        </Card.Description>
      
    
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
            <Button onClick={()=>BarnatStore.openForm(selectedBarna!.barnat_Id)}basic color='blue' content={<Edit/>}/>
            <Button  onClick={()=>del(selectedBarna!.barnat_Id)} basic  content={<DeleteForeverIcon/>} color='red'/>
        </ButtonGroup>
       
                            <PopUp
                               openPopup={editmode}
                              
                               title="Pacientat Form">
                                
                                   <BarnatForm/>
                                     </PopUp>
                                     <PopUp
                               openPopup={open}
                              
                               title="Pacientat Form">
                                 <PopupHeader icon='archive' content='Delete Barnen' />
                                <PopupContent>
                                    <p>
                                        Are you sure that you want to delete Barnen:{selectedBarna?.bName}?
                                    </p>
                                </PopupContent>
                                <CardActions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button color='green' onClick={() =>handleDelete(selectedBarna!.barnat_Id) }>
                                        <Icon name='checkmark' /> Yes
                                    </Button>
                                </CardActions>
                            
                                   
                                     </PopUp>
                                 
      </Card.Content>
    </Card>
      )
  }
  );

