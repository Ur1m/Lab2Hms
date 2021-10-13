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
import MoreHoriz from '@material-ui/icons/MoreHoriz';
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
                  <div className="btn" onClick={()=>openDetails(item.barnat_Id)} ><MoreHoriz/></div>
               </div>
            </div>
        ));
        
        
    
    return (
        <div className="containerr">
           
            <h3>Barnat</h3>
            <div className="b">
            <Button onClick={()=>openForm()} content={<AddIcon/>} color="green"  />
            </div>
       <div className="main_content">
          
           
           {item}
           <PopUp
                               openPopup={detailsmode}
                               setopenPopup={setopenpop}
                              >
                                <BarnatDetails/>
                                   
     </PopUp>
     <PopUp
                               openPopup={editmode}
                              
                               >
                                
                                   <BarnatForm/>
                                     </PopUp>
                                     <Modal
                                closeIcon
                                open={open}
                               
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Delete Barnen' />
                                <Modal.Content>
                                <p className="text-pop" color="black">
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
