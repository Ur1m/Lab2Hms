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
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import "../Dashboard/fatura.css";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import FaturaForm from './FaturaForm';
import { useStoreFaturat } from '../../../app/stores/store';
import PopUp from '../../Pacineti/PopUp';
import FaturaDetails from '../Details/FaturaDetails';

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

export default observer(function FaturaTable() {
  const classes = useStyles();
  const { FaturatStore } = useStoreFaturat();
  const [open, setOpen] = React.useState(false)
  const [openPop, setopenPop] = useState(false)
  const [search, setsearch] = useState("");

  const { Faturat, selectFatura, openForm, openDetails, selectedFatura, deleteFatura, closeForm, editMode, detailsmode, faturatRegistry } = FaturatStore
  useEffect(() => {
    FaturatStore.loadFaturat();
  }, [FaturatStore]);



  function del(id: string) {
    selectFatura(id);
    setOpen(true);
  }

  function handleDelete(id: string) {

    deleteFatura(id);
    setOpen(false);
    FaturatStore.selectedFatura = undefined;
  }
  
  function editf(id: string) {
    FaturatStore.openForm(id)
  }

  return (
    <div className="faturacontainer">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Titulli</StyledTableCell>
              <StyledTableCell align="right">Pershkrimi</StyledTableCell>
              <StyledTableCell align="right">Shuma</StyledTableCell>
              <StyledTableCell align="right">Statusi</StyledTableCell>
              <StyledTableCell align="right" colSpan={2}> <div className="ui left icon input"><input type="text" placeholder="Kerko fature..." onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div></StyledTableCell>

              <StyledTableCell align="right">{<Button onClick={() => openForm()} floated="right" content={<AddIcon />} color='green' />}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Faturat.filter((val) => {
              if (search == "") {
                return val;
              }
              else if (val.titulli.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return val;
              }
            }).map((row) => (
              <StyledTableRow key={row.fatura_Id}>
                <StyledTableCell component="th" scope="row">
                  {row.titulli}
                </StyledTableCell>
                <StyledTableCell align="right">{row.pershkrimi}</StyledTableCell>
                <StyledTableCell align="right">{row.shuma}</StyledTableCell>
                <StyledTableCell align="right">{row.statusi}</StyledTableCell>
                <StyledTableCell align="right">{<Button onClick={() => openDetails(row.fatura_Id)} floated="right" content='Shiko' color='blue' />}</StyledTableCell>
                <StyledTableCell align="right">{<Button onClick={() => openForm(row.fatura_Id)} floated="right" content={<EditIcon />} color='grey' />}</StyledTableCell>
                <StyledTableCell align="right">{<Button onClick={() => del(row.fatura_Id)} floated="right" content={<DeleteForeverIcon />} color='red' />}</StyledTableCell>
              </StyledTableRow>
            ))}
            <Dialog
              open={open}

              keepMounted

              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{"Fshije faturen?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  A jeni i sigurt ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color='red' onClick={() => setOpen(false)}>
                  <Icon name='remove' /> No</Button>
                <Button color='green' onClick={() => handleDelete(selectedFatura!.fatura_Id)}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </DialogActions>
            </Dialog>
            <PopUp
              openPopup={editMode}
              setopenPopup={setopenPop}
              title="Faturat Form">

              <FaturaForm />
            </PopUp>
            <PopUp
              openPopup={detailsmode}
              setopenPopup={setopenPop}>
              <FaturaDetails />
            </PopUp>


          </TableBody>


        </Table>
      </TableContainer>
    </div>

  );
});