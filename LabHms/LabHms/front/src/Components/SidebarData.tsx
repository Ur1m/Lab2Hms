import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as IconName from 'react-icons/gr';

export const SidebarData = [
  {
    title: 'Ballina',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Departamentet',
    path: '/Departamentet/',
    icon: <FaIcons.FaRegBuilding />,
    cName: 'nav-text'
  },
  {
    title: 'Laboratoret',
    path: '/Laboratori/',
    icon: <FaIcons.FaLaptopMedical />,
    cName: 'nav-text'
  },
  {
    title: 'Ambulacat',
    path: '/Ambulanca/',
    icon: <FaIcons.FaHeartbeat />,
    cName: 'nav-text'
  },
  {
    title: 'Raportet',
    path: '/Raport/',
    icon: <FaIcons.FaFileAlt />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Raportet',
  //   path: '/',
  //   icon: <IoIcons.IoIosPaper />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Pacientet',
    path: '/Pacientat',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Mjeket',
    path: '/Doktorat',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Terapia',
  //   path: '/therapy',
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   cName: 'nav-text'
  // },

  {
    title: 'Barnat',
    path: '/Barnat',
    icon: <FaIcons.FaMedkit/>,
    cName: 'nav-text'
  },
  // {
  //   title: 'Laboratori',
  //   path: '/laboratori',
  //   icon: <FaIcons.FaFlask/>,
  //   cName: 'nav-text'
  // },
  {
    title: 'Terminet',
    path: '/Terminet',
    icon: <FaIcons.FaClock/>,
    cName: 'nav-text'
  },
  {
    title: 'Terapit',
    path: '/Therapy',
    icon: <FaIcons.FaFileUpload/>,
    cName: 'nav-text'
  },
  {
    title: 'Paisjet',
    path: '/Paisjet',
    icon: <RiIcons.RiTableAltFill
    />,
    cName: 'nav-text'
  },
  {
    title: 'Fatura',
    path: '/Faturat',
    icon: <RiIcons.RiBillLine />,
    cName: 'nav-text'
  },
  {
    title: 'Dhoma',
    path: '/Dhomat',
    icon: <FaIcons.FaRestroom />,
    cName: 'nav-text'
  },
  {
    title: 'Shtreterit',
    path: '/Shtreter',
    icon: <GiIcons.GiBed />,
    cName: 'nav-text'
  },
  {
    title: 'Cakto Shtratin',
    path: '/caktoShtreterit',
    icon: <FaIcons.FaBed />,
    cName: 'nav-text'
  },
  {
    title: 'Lloji Shtratit',
    path: '/llojiShtratit',
    icon: <GiIcons.GiBed />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Ndihma teknike',
  //   path: '/',
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: 'nav-text'
  // },
  // {
  //   title: 'Infermieret',
  //   path: '/Infermieret',
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Errors',
    path: '/errors',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];