import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { observer } from 'mobx-react-lite';
import { useStorePaisjet } from '../../app/stores/store';
import { Button, Header, Modal,Icon,Image,Card } from 'semantic-ui-react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { PaisjetForm } from './PaisjetForm';
import PopUp from '../Pacineti/PopUp';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PaisjetDetails from './PaisjetDetails';
import { format } from 'date-fns';
import AddIcon from '@material-ui/icons/Add';
import "./p.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 445,
    minWidth:300,
    display: 'inline-block',
    margin:"20px",
    
    
    
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  buton:{
   width:300,
    display: 'inline-block',
    margin:"20px",
    height:330
  }
}));

export default observer(function Listimi() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {PaisjetStore}=useStorePaisjet();
    const{paisjet,openForm,selectPaisja,deletePaisja,selectedPaisja,editmode,detailsmode,openDetails}=PaisjetStore;
    const [open, setOpen] = React.useState(false)
    const[search,setsearch]=useState("");
    const [openPop,setopenPop]=useState(false)
    useEffect(()=>{
        PaisjetStore.loadPaisjet();
    },[PaisjetStore]);

  function handleExpandClick ()  {
    setExpanded(!expanded);
  };
  function more(id:string){
      selectPaisja(id);
      handleExpandClick();

  }
  function handleDelete( id: string){
        
    deletePaisja(id);
    setOpen(false);
    PaisjetStore.selectedPaisja=undefined;
  }
  function del(id:string){
    selectPaisja(id);
    
    setOpen(true);
    
}

  return (
      <React.Fragment >
        
          <div className="p">
            <h3>Paisjet</h3>
          <div className="zi">
<div className="ui left icon input s"><input type="text" placeholder="Search users..." onChange={event=>setsearch(event.target.value)}/><i aria-hidden="true" className="users icon"></i></div>
<Button onClick={()=>openForm()}floated="right" content={<AddIcon/>}color='green' />
</div>
<div className="pa">


          
    {paisjet.filter((val)=>{
                    if(search==""){
                        return val;
                    }
                    else if(val.emertimi.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                        return val;
                    }
                }).map(p =>(
     <Card className="i">
     <Image src={p.image} wrapped ui={false} className="ii"/>
     <Card.Content>
       <Card.Header>{p.emertimi}</Card.Header>
       <Card.Meta>{format(p.servisimi!,'MMMM d, yyyy')}</Card.Meta>
     </Card.Content>
     <Card.Content className="e" extra>
     <Button color="blue"onClick={()=>openDetails(p.paisja_Id)}content="view" />
     <Button onClick={()=>openForm(p.paisja_Id)} content={<EditIcon/>} color='grey' />
     <Button color="red"onClick={()=>del(p.paisja_Id)} ><Icon name="remove"/></Button>
      
     </Card.Content>
   </Card>
))
}
<Dialog
  open={open}
  
  keepMounted
 
  aria-labelledby="alert-dialog-slide-title"
  aria-describedby="alert-dialog-slide-description"
>
  <DialogTitle id="alert-dialog-slide-title">{"Delete Paisje"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-slide-description">
     Are you sure that you want to delete paisjen: {selectedPaisja && selectedPaisja!.emertimi}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
  <Button color='red' onClick={() => setOpen(false)}>
                                  <Icon name='remove' /> No</Button>
   <Button color='green' onClick={() =>handleDelete(selectedPaisja!.paisja_Id) }>
        <Icon name='checkmark' /> Yes
       </Button>
  </DialogActions>
</Dialog>
<PopUp
                               openPopup={editmode}
                              
                               >
                                
                                   <PaisjetForm/>
                                     </PopUp>
                                     <PopUp
                               openPopup={detailsmode}
                               >
                                   <PaisjetDetails/>
                                     </PopUp>
                                     </div>
                                     </div>
    </React.Fragment>)});