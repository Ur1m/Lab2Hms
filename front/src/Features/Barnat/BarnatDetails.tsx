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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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
        <Dialog
        open={open}
        
        keepMounted
       
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete Barna"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Are you sure that you want to delete barnen : {selectedBarna.bName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No</Button>
         <Button color='green' onClick={() =>handleDelete(selectedBarna!.barnat_Id) }>
              <Icon name='checkmark' /> Yes
             </Button>
        </DialogActions>
      </Dialog>
        
                            
         
                                 
      </Card.Content>
      
    </Card>
      )
  }
  );

