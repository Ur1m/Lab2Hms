import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from 'react';
import { Button, ButtonGroup, Card, Header, Image, Modal,Icon, PopupContent, PopupHeader } from "semantic-ui-react";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Edit from "@material-ui/icons/Edit";
import { CardActions } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { StoreLlojiShtratit, useStoreLlojiShtratit } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer( function LlojiShtratitDetails ()  {

    const {LlojiShtratitStore} = useStoreLlojiShtratit();
    const{selectedLlojiShtratit,selectLlojiShtratit,deleteLlojiShtratit,editMode,openForm} = LlojiShtratitStore;
    const [open, setOpen] = React.useState(false)

    if(!selectedLlojiShtratit) return <LoadingComponent/>;
    function del(id:string){
      
      setOpen(true);
    
      
  }
  function handleDelete( id: string){
          
    deleteLlojiShtratit(id);
  setOpen(true);
  LlojiShtratitStore.closeDetails()
    
  LlojiShtratitStore.selectedLlojiShtratit=undefined;
  }
      return (
          <Card fluid>
            <Image src={`${selectedLlojiShtratit.image}`} />
      
      <Card.Content>
     
        <Card.Description>{"Emri :"+selectedLlojiShtratit.emri}</Card.Description>
        
        <Card.Description>
          {"Pershkrimi"+selectedLlojiShtratit.pershkrimi}.
        </Card.Description>
      
    
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
            <Button onClick={()=>LlojiShtratitStore.openForm(selectedLlojiShtratit!.llojiShtratit_id)}basic color='blue' content={<Edit/>}/>
            <Button  onClick={()=>del(selectedLlojiShtratit!.llojiShtratit_id)} basic  content={<DeleteForeverIcon/>} color='red'/>
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
           A jeni i sigurt qe deshironi te fshini llojin e shtratit: {selectedLlojiShtratit.emri}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No</Button>
         <Button color='green' onClick={() =>handleDelete(selectedLlojiShtratit!.llojiShtratit_id) }>
              <Icon name='checkmark' /> Yes
             </Button>
        </DialogActions>
      </Dialog>
        
                            
         
                                 
      </Card.Content>
      
    </Card>
      )
  }
  );

