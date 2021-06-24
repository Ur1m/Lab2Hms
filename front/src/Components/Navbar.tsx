import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Button, Menu, Segment } from 'semantic-ui-react';
import { useStore } from '../app/stores/store';

interface IProps{
  openCreateForm: () => void;
}

function Navbar({openCreateForm} : IProps) {
  const {departmentStore} = useStore();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="logo">
          <img className="logo" src="assets/logo.png" alt="logo" style={{width: '50px', marginLeft: '200px'}}/>
          </div>
          <div className="navi">
          <Button inverted className="Log out" style={{marginLeft: '-500px'}}> Log Out</Button>
        </div>
       
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* <Button onClick={openCreateForm} positive content='Shto Analizat'/> */}
        
      </IconContext.Provider>
    </>
  );
}

export default Navbar;