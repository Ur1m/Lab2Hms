import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import "./lloji.css"
import {Button, Image, Modal,Header,Icon} from 'semantic-ui-react';
import { format } from 'date-fns';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { useStoreLlojiShtratit } from '../../../app/stores/store';
import LlojiShtratitDetails from '../Details/LlojiShtratitDetails';
import PopUp from '../../Pacineti/PopUp';
import { LlojiShtratitForm } from '../Form/LlojiShtratitForm';

export default observer( function LlojiShtratitDesign  ()  {
    const {LlojiShtratitStore} = useStoreLlojiShtratit();
    const{llojiShtreterve,selectLlojiShtratit,openForm,selectedLlojiShtratit,deleteLlojiShtratit,detailsmode,openDetails,editMode} = LlojiShtratitStore;
    useEffect(()=>{
        LlojiShtratitStore.loadllojiShtreterve();
    },[LlojiShtratitStore]);
    const [openpop,setopenpop]=React.useState(false);
    const [open, setOpen] = React.useState(false)
   

    function del(id:string){
      selectLlojiShtratit(id);
      if(!LlojiShtratitStore.detailsmode){
        setOpen(true);
      }
        
      
        
    }
    function handleDelete( id: string){
            
      deleteLlojiShtratit(id);
      setOpen(false);
      LlojiShtratitStore.selectedLlojiShtratit=undefined;
    }
    

        const item=llojiShtreterve.map((item)=>(
            <div className="carde" key={item.llojiShtratit_id} >
               <div className="carde_img">
                   <img src={item.image}/>
               </div>
               <div className="card_headerr">
                   <div className="carde-h-1 " >
                   <h1>{item.emri}</h1>
                   <h4>{item.pershkrimi}</h4>
                   </div>
                  <div className="btn" onClick={()=>openDetails(item.llojiShtratit_id)} ><MoreHoriz/></div>
               </div>
            </div>
        ));
        
        
    
    return (
        <div className="llojishtratitcontainer">
           
            <h6>Llojet e Shtreterve</h6>
            <div className="b">
            <Button onClick={()=>openForm()} content={<AddIcon/>} color="green"  />
            </div>
       <div className="main_content">
          
           
           {item}
           <PopUp
                               openPopup={detailsmode}
                               setopenPopup={setopenpop}
                              >
                                <LlojiShtratitDetails/>
                                   
     </PopUp>
     <PopUp
                               openPopup={editMode}
                              
                               >
                                
                                   <LlojiShtratitForm/>
                                     </PopUp>
                                     <Modal
                                closeIcon
                                open={open}
                               
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}>
                                <Header icon='archive' content='Fshij llojin e shtratit' />
                                <Modal.Content>
                                    <p>
                                        A jeni i sigurt qe doni te fshini llojin e shtratit:{selectedLlojiShtratit?.emri}?
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={() => setOpen(false)}>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button color='green' onClick={() =>handleDelete(selectedLlojiShtratit!.llojiShtratit_id) }>
                                        <Icon name='checkmark' /> Yes
                                    </Button>
                                </Modal.Actions>
                            </Modal>
       </div>
      
       </div>
    )
 });
