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
import "../Dashboard/shtrat.css";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PopUp from '../../Pacineti/PopUp';
import { useStoreShtrat } from '../../../app/stores/store';
import ShtratDetails from '../Details/ShtratDetails';
import ShtratForm from './ShtratForm';

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

export default observer(function ShtratTable() {
  const classes = useStyles();
  const { ShtratStore } = useStoreShtrat();
  const [open, setOpen] = React.useState(false)
  const [openPop, setopenPop] = useState(false)
  const [search, setsearch] = useState("");

  const { Shtrat, selectShtrat, openForm, openDetails, selectedShtrat, deleteShtrat, closeForm, editMode, detailsmode, shtratRegistry } = ShtratStore
  useEffect(() => {
    ShtratStore.loadShtreter();
  }, [ShtratStore]);



  function del(id: string) {
    selectShtrat(id);
    setOpen(true);
  }

  function handleDelete(id: string) {

    deleteShtrat(id);
    setOpen(false);
    ShtratStore.selectedShtrat = undefined;
  }
  
  function editf(id: string) {
    ShtratStore.openForm(id)
  }

  return (
    <div className="shtratcontainer">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Numri i shtratit:</StyledTableCell>
              <StyledTableCell align="right">Pershkrimi:</StyledTableCell>
              <StyledTableCell align="right">Statusi:</StyledTableCell>
              <StyledTableCell align="right" colSpan={2}> <div className="ui left icon input"><input type="text" placeholder="Kerko Shtrat (Statusi)..." onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div></StyledTableCell>

              <StyledTableCell align="right">{<Button onClick={() => openForm()} floated="right" content={<AddIcon />} color='green' />}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Shtrat.filter((val) => {
              if (search == "") {
                return val;
              }
              else if (val.statusi.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return val;
              }
            }).map((row) => (
              <StyledTableRow key={row.shtrat_id}>
                <StyledTableCell component="th" scope="row">
                  {row.nrShtratit}
                </StyledTableCell>
                <StyledTableCell align="right">{row.pershkrimi}</StyledTableCell>
                <StyledTableCell align="right">{row.statusi}</StyledTableCell>
                <StyledTableCell align="right">{<Button onClick={() => openDetails(row.shtrat_id)} floated="right" content='Shiko' color='blue' />}</StyledTableCell>
                <StyledTableCell align="right">{<Button onClick={() => openForm(row.shtrat_id)} floated="right" content={<EditIcon />} color='grey' />}</StyledTableCell>
                <StyledTableCell align="right">{<Button onClick={() => del(row.shtrat_id)} floated="right" content={<DeleteForeverIcon />} color='red' />}</StyledTableCell>
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
                <Button color='green' onClick={() => handleDelete(selectedShtrat!.shtrat_id)}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </DialogActions>
            </Dialog>
            <PopUp
              openPopup={editMode}
              setopenPopup={setopenPop}
              title="Shtreter">

              <ShtratForm />
            </PopUp>
            <PopUp
              openPopup={detailsmode}
              setopenPopup={setopenPop}>
              <ShtratDetails />
            </PopUp>


          </TableBody>


        </Table>
      </TableContainer>
    </div>

  );
});