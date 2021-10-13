import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStoreDoktorat, useStorePacientat, useStoreTerminet } from '../../app/stores/store';
import { Button, Icon } from 'semantic-ui-react';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { TerminatForm } from './TerminatForm';
import PopUp from '../Pacineti/PopUp';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { IPacientetDropDown, IPacienti } from '../../app/models/IPacienti';
import { IDoktori } from '../../app/models/Doktori';
import { format } from 'date-fns';
import TerminetDetails from './TerminetDetails';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default  observer( function TerminetTable() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const {TerminetStore}=useStoreTerminet();
  const {PacientatStore}=useStorePacientat();
  const{terminet,selectTermini,openForm,deleteTermini,editmode,selectedTermini,getDoktoret,getPacientet,openDetails,detailsmode}=TerminetStore;
  const {DoktoratStore}=useStoreDoktorat();
  const{doktoratRegistry}=DoktoratStore;
  const{pacientatRegistry}=PacientatStore
  useEffect(()=>{
    TerminetStore.loadTerminet();
    PacientatStore.loadPacientat();
    DoktoratStore.loadDoktorat();
    
},[TerminetStore]);

  function del(id:string){
    selectTermini(id);
    setOpen(true);
    
}
function handleDelete( id: string){
        
  deleteTermini(id);
  setOpen(false);
  TerminetStore.selectedTermini=undefined;
}


  return (
    <div className="t">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Pacineti </StyledTableCell>
            <StyledTableCell align="right">Mjeku</StyledTableCell>
            <StyledTableCell align="right">Dita</StyledTableCell>
            <StyledTableCell align="right"> Ora</StyledTableCell>
            <StyledTableCell align="right"> </StyledTableCell>
            <StyledTableCell align="right">{<Button onClick={()=>openForm()}floated="right" content={<AddIcon/>}color='green' />}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {terminet.map((row) => (
            <StyledTableRow key={row.termini_ID}>
              <StyledTableCell component="th" scope="row">
               {pacientatRegistry.get(row.pacient_Id)?.emri+"  " }{" "+ pacientatRegistry.get(row.pacient_Id)?.mbimeri}
              </StyledTableCell>
              <StyledTableCell align="right">{doktoratRegistry.get(row.mjeku_Id)?.emri+"  "+doktoratRegistry.get(row.mjeku_Id)?.mbimeri}</StyledTableCell>
              <StyledTableCell align="right">{format(row.orari!, "MMMM d, yyyy ")}</StyledTableCell>
              <StyledTableCell align="right">{format(row.orari!, " HH:mm")}</StyledTableCell>
              <StyledTableCell align="right">{<Button onClick={()=>openForm(row.termini_ID)}floated="right" content={<EditIcon/>} color='grey' />}</StyledTableCell>
              <StyledTableCell align="right">{<Button  onClick={()=>del(row.termini_ID)}floated="right" content={<DeleteForeverIcon/>} color='red' />}</StyledTableCell>
            </StyledTableRow>
            
          ))}
          <PopUp
            openPopup={editmode}
            >
                <TerminatForm/>
                  </PopUp>


                  <Dialog
  open={open}
  
  keepMounted
 
  aria-labelledby="alert-dialog-slide-title"
  aria-describedby="alert-dialog-slide-description"
>
  <DialogTitle id="alert-dialog-slide-title">{"Delete Termini"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-slide-description">
    <p className="text-pop" color="black">
     Are you sure that you want to delete Terminin 
     </p>
    </DialogContentText>
  </DialogContent>
  <DialogActions>
  <Button color='red' onClick={() => setOpen(false)}>
                                  <Icon name='remove' /> No</Button>
   <Button color='green' onClick={() => selectedTermini && handleDelete(selectedTermini!.termini_ID) }>
        <Icon name='checkmark' /> Yes
       </Button>
  </DialogActions>
</Dialog>
<PopUp
                               openPopup={detailsmode}
                               >
                                   <TerminetDetails/>
                                     </PopUp>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
})

function getDoktoret() {
  throw new Error('Function not implemented.');
  
}
