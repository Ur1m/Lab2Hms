import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Item,Button,Label, Segment, Modal, Header, Icon } from 'semantic-ui-react';
import './dc.css';
import { IDoktori } from '../../app/models/Doktori';
import { useStoreDoktorat } from '../../app/stores/store';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PopUp from '../Pacineti/PopUp';
import DoktoriForm from './DoktoriForm';
import AddIcon from '@material-ui/icons/Add';
import DoktoriDetails from './DoktoriDetails';





export default observer(function DoktoratList () {
    const {DoktoratStore}=useStoreDoktorat();
    const{doktorat,selectDoktori,deleteDoktori,openForm,selectedDoktori,editmode,openDetails,detailsmode}=DoktoratStore;
    const [open, setOpen] = React.useState(false)
    const [dimmer,setDimmer]=React.useState(false)
    
    const[search,setsearch]=useState("");
    useEffect(()=>{
        DoktoratStore.loadDoktorat();
    },[DoktoratStore]);
    function handleDelete( id: string){
        
        deleteDoktori(id);
        setOpen(false);
        DoktoratStore.selectedDoktori=undefined;
    }
    function del(id:string){
        selectDoktori(id);
        
        setOpen(true);
        
    }
    
    
   
    return (
       
            <React.Fragment>
                <div className="containerrr">
                   
<div className="zi">
<div className="ui left icon input s"><input type="text" placeholder="Search users..." onChange={event=>setsearch(event.target.value)}/><i aria-hidden="true" className="users icon"></i></div>
<Button onClick={()=>openForm()}floated="right" content={<AddIcon/>}color='green' />

</div>
               
                <div className="ui special cards uii">
                    {doktorat.filter((val)=>{
                    if(search==""){
                        return val;
                    }
                    else if(val.emri.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                        return val;
                    }
                }).map((item)=>(
                        <div className="card">
    <div className="blurring dimmable image">
      <div className="ui dimmer"
      
        
      >
        <div className="content">
          <div className="center">
            <div className="ui inverted button">Add Friend</div>
          </div>
        </div>
      </div>
      <img src="assets/doc.jpg" />
    </div>
    <div className="content">
      <a className="header">{item.emri}  { item.mbimeri}</a>
      <div className="meta">
        <span className="date">Department : {item.depName}</span><br/>
        <span className="date">Ditlindja: {format(item.ditlindja!,'MMMM d, yyyy')}</span><br/>
        <span className="date">Specializimi : {item.specializimi}</span>
      </div>
    </div>
    <div className="extra content bt">
    
    <Button color="grey"  onClick={() =>openForm(item!.mjeku_Id) }>
                                        <Icon name='edit' /> Edit
                                    </Button>
            <Button color='red' onClick={() =>del(item!.mjeku_Id) }>
                                        <Icon name='remove' /> Delete
                                    </Button>
                                    
    </div>
    
<PopUp
                               openPopup={editmode}
                              
                               title="">
                                
                                   <DoktoriForm/>
                                     </PopUp>
                                     <PopUp
                               openPopup={detailsmode}
                               >
                                   <DoktoriDetails/>
                                     </PopUp>
  </div>
  
                    ))}
                    <Dialog
  open={open}
  
  keepMounted
 
  aria-labelledby="alert-dialog-slide-title"
  aria-describedby="alert-dialog-slide-description"
>
  <DialogTitle id="alert-dialog-slide-title">{"Delete Mjekun"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-slide-description">
     Are you sure that you want to delete Mjekun : {selectedDoktori && selectedDoktori!.emri}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
  <Button color='red' onClick={() => setOpen(false)}>
                                  <Icon name='remove' /> No</Button>
   <Button color='green' onClick={() =>handleDelete(selectedDoktori!.mjeku_Id) }>
        <Icon name='checkmark' /> Yes
       </Button>
  </DialogActions>
</Dialog>
  
  </div>
  </div>
  
   
            </React.Fragment>
               
        
    )
}
)
