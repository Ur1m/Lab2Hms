import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Item, Button, Label, Segment, Modal, Header, Icon } from 'semantic-ui-react';
import { useStore, useStoreAmbulancat, useStoreLaboratori } from '../../app/stores/store';
import AddIcon from '@material-ui/icons/Add';
import { departamentet } from '../../app/FormElements/DoktoriOptions';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PopUp from '../Pacineti/PopUp';
import AmbulancaDetails from './AmbulancaDetails';
import AmbulancaForm from './AmbulancaForm';
import AmbulancaStore from '../../app/store/AmbulancaStore';


export default observer(function AmbulancaTable() {
    const {AmbulancaStore} = useStoreAmbulancat();
    const {selectAmbulancat,selectedAmbulanca,selectedAmbulanca :Ambulanca, Ambulancat,loadAmbulancat,openForm,cancelSelectedAmbulancat,editMode,deleteAmbulancat,detailsmode,loading} = AmbulancaStore;
    const [open, setOpen] = React.useState(false)
    const [dimmer, setDimmer] = React.useState(false)

    const [search, setsearch] = useState("");
    useEffect(() => {
        AmbulancaStore.loadAmbulancat();
    }, [AmbulancaStore]);

    function handleDelete(id: string) {

        deleteAmbulancat(id);
        setOpen(false);
        AmbulancaStore.selectedAmbulanca = undefined;
    }

    function del(id: string) {
        selectAmbulancat(id);
        setOpen(true);
    }

    return (
        <React.Fragment>
            <div className="containerrr">
            <div className="zi">
                <div className="ui left icon input s"><input type ="text" placeholder="Search ambulancat..." onChange={event => setsearch(event.target.value)}/><i aria-hidden="true" className="users icon"></i></div>
                <Button onClick={() => openForm()}floated="right" content={<AddIcon/>}color='green' />
            </div>
            <div className="ui special cards uii">
                {Ambulancat.filter((val) => {
                    if (search == "") {
                    return val;
                }
                else if (val.tipi.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                    return val;
                }
                }).map((item) => (
                  <div className="card">
                <div className="blurring dimmable image">
            <div className="ui dimmer">
            <div className="content">
            <div className="center">
            <div className="ui inverted button">Add Friend</div>
            </div>
            </div>
            </div>
            <img src={item.fotografia} />
            </div>
            <div className="content">
            <a className="header">{item.tipi}</a>
            
           
            
            </div>
            <div className="extra content bt">

            <Button onClick={()=>AmbulancaStore.openForm(item!.amb_Id)}basic color='blue' content="Edit"/>
            <Button color='red' onClick={() => del(item!.amb_Id)}>
            <Icon name='remove' /> Delete
            </Button>

            </div>
            <PopUp
            openPopup={editMode}

            title="Pacientat Form">

            <AmbulancaForm />
            </PopUp>
            <PopUp
            openPopup={detailsmode}
            >
            <AmbulancaDetails />
            </PopUp>
            </div>

        ))}
            <Dialog
            open={open}

            keepMounted

            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Delete Department"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            Are you sure that you want to delete this ambulanc: {selectedAmbulanca && selectedAmbulanca!.tipi}
            </DialogContentText>
            </DialogContent>
            <DialogActions> 
            <Button color='red' onClick={() => setOpen(false)}>
            <Icon name='remove' /> No</Button>
            <Button color='green' onClick={() => handleDelete(selectedAmbulanca!.amb_Id)}>
            <Icon name='checkmark' /> Yes
            </Button>
            </DialogActions>
            </Dialog>
        </div>
      </div>
        </React.Fragment>
    )
});