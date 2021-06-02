import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Ballina',
    path: '/',
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
    title: 'Raportet',
    path: '/',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Pacientet',
    path: '/pacientet',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Mjeket',
    path: '/Doktorat',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Terapia',
    path: '/therapy',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Fatura',
    path: '/',
    icon: <RiIcons.RiBillLine />,
    cName: 'nav-text'
  },
  {
    title: 'Ndihma teknike',
    path: '/',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Errors',
    path: '/errors',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];