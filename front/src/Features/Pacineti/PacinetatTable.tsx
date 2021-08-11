import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react-lite';
import { useStorePacientat } from '../../app/stores/store';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import AddIcon from '@material-ui/icons/Add';
import PopUp from './PopUp';
import { PacientatForm } from './PacientatForm';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import PacentatDetails from './PacentatDetails';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default observer(function PacientatTable() {
  const classes = useStyles();
  const {PacientatStore}=useStorePacientat();
  const [open, setOpen] = React.useState(false)
  const [openPop,setopenPop]=useState(false)
  const[search,setsearch]=useState("");

    const{pacientat,selectPacineti,openForm,selectedPacienti,deletePacienti,closeForm,editmode,detailsmode,openDetails,closeDetails}=PacientatStore
    useEffect(()=>{
      PacientatStore.loadPacientat();
  },[PacientatStore]);

  function del(id:string){
    selectPacineti(id);
    
    setOpen(true);
    
}
function handleDelete( id: string){
        
  deletePacienti(id);
  setOpen(false);
  PacientatStore.selectedPacienti=undefined;
}
function editf(id:string){
  PacientatStore.openForm(id)
}

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Emri</StyledTableCell>
            <StyledTableCell align="right">Mbiemri</StyledTableCell>
            <StyledTableCell align="right"colSpan={2}> <div className="ui left icon input"><input type="text" placeholder="Search users..." onChange={event=>setsearch(event.target.value)}/><i aria-hidden="true" className="users icon"></i></div></StyledTableCell>
            
            <StyledTableCell align="right">{<Button onClick={()=>openForm()}floated="right" content={<AddIcon/>}color='green' />}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pacientat.filter((val)=>{
                    if(search==""){
                        return val;
                    }
                    else if(val.emri.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
                        return val;
                    }
                }).map((row) => (
            <StyledTableRow key={row.pacient_Id}>
              <StyledTableCell component="th" scope="row">
                {row.emri}
              </StyledTableCell>
              <StyledTableCell align="right">{row.mbimeri}</StyledTableCell>
              <StyledTableCell align="right">{<Button onClick={()=>openDetails(row.pacient_Id)}floated="right" content='View' color='blue' />}</StyledTableCell>
              <StyledTableCell align="right">{<Button onClick={()=>openForm(row.pacient_Id)}floated="right" content={<EditIcon/>} color='grey' />}</StyledTableCell>
              <StyledTableCell align="right">{<Button  onClick={()=>del(row.pacient_Id)}floated="right" content={<DeleteForeverIcon/>} color='red' />}</StyledTableCell>
            </StyledTableRow>
          ))}
          <Modal
                                closeIcon
                                open={open}
                               
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Delete Pacientin' />
                                <Modal.Content>
                                    <p>
                                        Are you sure that you want to delete Pacinetin:{selectedPacienti?.emri}?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button color='green' onClick={() =>handleDelete(selectedPacienti!.pacient_Id) }>
                                        <Icon name='checkmark' /> Yes
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                            <PopUp
                               openPopup={editmode}
                               setopenPopup={setopenPop}
                               title="Pacientat Form">
                                
                                   <PacientatForm/>
                                     </PopUp>
                                     <PopUp
                               openPopup={detailsmode}
                               setopenPopup={setopenPop}>
                                   <PacentatDetails/>
                                     </PopUp>
                            
                            
        </TableBody>
       
      
      </Table>
    </TableContainer>
     
  );
});