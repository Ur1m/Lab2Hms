import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Item, Button, Label, Segment, Modal, Header, Icon, TableCell, TableRow, Table, TableBody } from 'semantic-ui-react';
import AddIcon from '@material-ui/icons/Add';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Paper, TableContainer, TableHead, withStyles } from '@material-ui/core';
import PopUp from '../../Pacineti/PopUp';
import { useStore, useStoreDhoma } from '../../../app/stores/store';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import DhomaForm from './DhomaForm';
import DhomaDetails from '../Details/DhomaDetails';

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

export default observer(function DhomaTable() {
    const classes = useStyles();
    const { DhomaStore } = useStoreDhoma();
    const [open, setOpen] = React.useState(false)
    const [openPop, setopenPop] = useState(false)
    const [search, setsearch] = useState("");

    const { deleteDhoma, Dhomat, openForm,openDetails, editMode, selectedDhoma, selectDhoma, loading, detailsmode } = DhomaStore
    useEffect(() => {
        DhomaStore.loadDhomat();
    }, [DhomaStore]);

    function del(id: string) {
        selectDhoma(id);
        setOpen(true);
    }

    function handleDelete(id: string) {

        deleteDhoma(id);
        setOpen(false);
        DhomaStore.selectedDhoma = undefined;
    }

    function editf(id: string) {
        DhomaStore.openForm(id)
    }

    return (
        <div className="faturacontainer">
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Numri Dhomes</StyledTableCell>
                            <StyledTableCell align="right">Pershkrimi</StyledTableCell>
                            <StyledTableCell align="right">Lloji Dhomes</StyledTableCell>
                            <StyledTableCell align="right" colSpan={2}> <div className="ui left icon input"><input type="text" placeholder="Kerko sipas llojit.." onChange={event => setsearch(event.target.value)} /><i aria-hidden="true" className="search icon"></i></div></StyledTableCell>

                            <StyledTableCell align="right">{<Button onClick={() => openForm()} floated="right" content={<AddIcon />} color='green' />}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                    {Dhomat.filter((val) => {
                        if (search == "") {
                            return val;
                        }
                        else if (val.llojiDhomes.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return val;
                        }
                    }).map((row) =>(
                        <StyledTableRow key={row.dhoma_Id}>
                            <StyledTableCell component="th" scope="row">
                            {row.nrDhomes}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.pershkrimi}</StyledTableCell>
                            <StyledTableCell align="right">{row.llojiDhomes}</StyledTableCell>
                            <StyledTableCell align="right">{<Button onClick={() => openDetails(row.dhoma_Id)} floated="right" content='Shiko' color='blue' />}</StyledTableCell>
                            <StyledTableCell align="right">{<Button onClick={() => openForm(row.dhoma_Id)} floated="right" content={<EditIcon />} color='grey' />}</StyledTableCell>
                            <StyledTableCell align="right">{<Button onClick={() => del(row.dhoma_Id)} floated="right" content={<DeleteForeverIcon />} color='red' />}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                        <Dialog
                            open={open}

                            keepMounted

                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Fshije dhomen?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                A jeni i sigurt ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button color='red' onClick={() => setOpen(false)}>
                                <Icon name='remove' /> No</Button>
                                <Button color='green' onClick={() => handleDelete(selectedDhoma!.dhoma_Id)}>
                                <Icon name='checkmark' /> Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <PopUp
                            openPopup={editMode}
                            setopenPopup={setopenPop}
                            title="Faturat Form">

                            <DhomaForm />
                            </PopUp>
                            <PopUp
                            openPopup={detailsmode}
                            setopenPopup={setopenPop}>
                            <DhomaDetails />
                        </PopUp>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
});