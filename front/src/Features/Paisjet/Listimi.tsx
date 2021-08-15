import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { observer } from 'mobx-react-lite';
import { useStorePaisjet } from '../../app/stores/store';
import PaisjetDetails from './PaisjetDetails';
import { Button, Header, Modal,Icon,Image } from 'semantic-ui-react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { PaisjetForm } from './PaisjetForm';
import PopUp from '../Pacineti/PopUp';

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
    const{paisjet,openForm,selectPaisja,deletePaisja,selectedPaisja,editmode}=PaisjetStore;
    const [open, setOpen] = React.useState(false)
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
          <Button onClick={()=>openForm()} floated="right" content={<Image src={"assets/add.png"}/>} color='green'  className={classes.buton} />
    {paisjet.map(p =>(
    <Card className={classes.root} key={p.paisja_Id} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <Image src={`assets/doc.jpg`}  />
          </Avatar>
        }
      
        title={p.emertimi}
        
      />
      <CardMedia
        className={classes.media}
        image={p.image}
       
      />
      <CardContent>
       
      </CardContent>
      <CardActions disableSpacing>
      <Button onClick={()=>del(p.paisja_Id)}basic  content={<DeleteForeverIcon/>} color="red"/>
      <Button onClick={()=>openForm(p.paisja_Id)}floated="right" content={<EditIcon/>} color='grey' />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={()=>more(p.paisja_Id)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
         
          <Typography paragraph>
           <PaisjetDetails/>
          </Typography>
         
        </CardContent>
      </Collapse>
      <Modal
      closeIcon
      open={open}
     
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}>
      <Header icon='archive' content='Delete Pacientin' />
      <Modal.Content>
          <p>
              Are you sure that you want to delete Pacinetin:{selectedPaisja?.emertimi}?
          </p>
      </Modal.Content>
      <Modal.Actions>
          <Button color='red' onClick={() => setOpen(false)}>
              <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={() =>handleDelete(selectedPaisja!.paisja_Id) }>
              <Icon name='checkmark' /> Yes
          </Button>
      </Modal.Actions>
  </Modal>
  <PopUp
                               openPopup={editmode}
                               setopenPopup={setopenPop}
                               title="Pacientat Form">
                                
                                   <PaisjetForm/>
                                     </PopUp>
    </Card>
     
))
}
    </React.Fragment>)});