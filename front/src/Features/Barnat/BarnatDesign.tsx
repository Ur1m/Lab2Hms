import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import "./design.css"
import { useStoreBarnat } from '../../app/stores/store';
import {Button, Image, Modal,Header,Icon} from 'semantic-ui-react';
import { format } from 'date-fns';
import PopUp from '../Pacineti/PopUp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import BarnatDetails from './BarnatDetails';
import { BarnatForm } from './BarnatForm';
export default observer( function BarnatDesign  ()  {
    const {BarnatStore}=useStoreBarnat();
    const{Barnat,selectBarna,openForm,selectedBarna,deleteBarna,detailsmode,openDetails,editmode}=BarnatStore;
    useEffect(()=>{
        BarnatStore.loadBarnat();
    },[BarnatStore]);
    const [openpop,setopenpop]=React.useState(false);
    const [open, setOpen] = React.useState(false)

    function del(id:string){
      selectBarna(id);
      if(!BarnatStore.detailsmode){
        setOpen(true);
      }
        
      
        
    }
    function handleDelete( id: string){
            
      deleteBarna(id);
      setOpen(false);
      BarnatStore.selectedBarna=undefined;
    }
    

        const item=Barnat.map((item)=>(
            <div className="carde" key={item.barnat_Id} >
               <div className="carde_img">
                   <img src={item.image}/>
               </div>
               <div className="card_headerr">
                   <div className="carde-h-1 " >
                   <h1>{item.bName}</h1>
                   <h4>{format(item.dataRegjistrimit!,'MMMM d, yyyy')}</h4>
                   </div>
                  <div className="btn" onClick={()=>openDetails(item.barnat_Id)} >more</div>
               </div>
            </div>
        ));
        
        
    
    return (
        <div className="containerr">
            <div className="h">
            <h3>Barnat</h3>
            <Button onClick={()=>openForm()} content={<AddIcon/>} color="green" className="b" />
            </div>
       <div className="main_content">
          
           
           {item}
           <PopUp
                               openPopup={detailsmode}
                               setopenPopup={setopenpop}
                               title="Pacientat Form">
                                <BarnatDetails/>
                                   
     </PopUp>
     <PopUp
                               openPopup={editmode}
                              
                               title="Pacientat Form">
                                
                                   <BarnatForm/>
                                     </PopUp>
                                     <Modal
                                closeIcon
                                open={open}
                               
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Delete Barnen' />
                                <Modal.Content>
                                    <p>
                                        Are you sure that you want to delete Barnen:{selectedBarna?.bName}?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button color='green' onClick={() =>handleDelete(selectedBarna!.barnat_Id) }>
                                        <Icon name='checkmark' /> Yes
                                    </Button>
                                </Modal.Actions>
                            </Modal>
       </div>
      
       </div>
    )
 });
