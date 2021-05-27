import React from 'react'
import { Button, Container, Menu, Segment } from 'semantic-ui-react'
import '../../App/layout/styles.css';
export default function Navbar(){
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
            <Button color='google plus' content='DOKTORI'style={{marginLeft:'50px',width:'150px'}}/>
            <Button color='google plus' content='PACIENTI'style={{marginLeft:'50px',width:'150px'}}/>

          </Menu.Item>
              
        </Container>
    </Menu>
    </div>
  )
}