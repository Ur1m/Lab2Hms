import { observer } from 'mobx-react-lite';
import  { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'
import '../../app/layout/styles.css';
import DoktoretStore from '../../app/store/doktoretStor';

import doktoretStor from '../../app/store/doktoretStor';
interface IProps{
  opencreateform:()=>void;
}

const Navbar:React.FC<IProps>=({opencreateform})=>{
 

  return(
    <div className="sss">
    <Menu inverted fixed="top">
        <Container>
        
          <Menu.Item header>
            <img className="logo" src="assets/logo.png" alt="logo" style={{marginRight:'50px'}}/>
           HospitalX 
          </Menu.Item>
          
          <Menu.Item>
            <Button color='google plus' content='DEPARTAMENTI'style={{marginLeft:'250px'}}/>
            <Button color='google plus'content='DOKTORI'style={{marginLeft:'50px',width:'150px'}}  onClick={opencreateform}/>

          </Menu.Item>
              
        </Container>
    </Menu>
    </div>
  )
}
export default observer(Navbar);