import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Item, Button, Label, Segment, Modal, Header, Icon } from 'semantic-ui-react';
import { useStore, useStoreDepartment } from '../../../app/stores/store';
import AddIcon from '@material-ui/icons/Add';
import { departamentet } from '../../../app/FormElements/DoktoriOptions';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PopUp from '../../Pacineti/PopUp';
import DepartmentForm from './DepartmentForm';
import DepartmentDetails from '../Details/DepartmentDetails';


export default observer(function DepartmentTable() {
    const { DepartmentStore } = useStoreDepartment();
    const { deleteDepartment, Departmentet, openForm, editMode, selectedDepartment, selectDepartment, loading, detailsmode } = DepartmentStore;
    const [open, setOpen] = React.useState(false)
    const [dimmer, setDimmer] = React.useState(false)

    const [search, setsearch] = useState("");
    useEffect(() => {
        DepartmentStore.loadDepartamentet();
    }, [DepartmentStore]);

    function handleDelete(id: string) {

        deleteDepartment(id);
        setOpen(false);
        DepartmentStore.selectedDepartment = undefined;
    }

    function del(id: string) {
        selectDepartment(id);
        setOpen(true);
    }

    return (
        <React.Fragment>
            <div className="containerrr">
            <div className="zi">
                <div className="ui left icon input s"><input type ="text" placeholder="Search departments..." onChange={event => setsearch(event.target.value)}/><i aria-hidden="true" className="users icon"></i></div>
                <Button onClick={() => openForm()}floated="right" content={<AddIcon/>}color='green' />
            </div>
            <div className="ui special cards uii">
                {Departmentet.filter((val) => {
                    if (search == "") {
                    return val;
                }
                else if (val.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
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
            <a className="header">{item.name}</a>
            <div className="meta">
            <span className="date">{item.description}</span><br />
            </div>
            </div>
            <div className="extra content bt">

            <Button color="grey" onClick={() => openForm(item!.department_id)}>
            <Icon name='edit' /> Edit
            </Button>
            <Button color='red' onClick={() => del(item!.department_id)}>
            <Icon name='remove' /> Delete
            </Button>

            </div>
            <PopUp
            openPopup={editMode}

            title="Pacientat Form">

            <DepartmentForm />
            </PopUp>
            <PopUp
            openPopup={detailsmode}
            >
            <DepartmentDetails />
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
            Are you sure that you want to delete this department: {selectedDepartment && selectedDepartment!.name}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button color='red' onClick={() => setOpen(false)}>
            <Icon name='remove' /> No</Button>
            <Button color='green' onClick={() => handleDelete(selectedDepartment!.department_id)}>
            <Icon name='checkmark' /> Yes
            </Button>
            </DialogActions>
            </Dialog>
        </div>
      </div>
        </React.Fragment>
    )
});