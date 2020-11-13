import React from 'react';
import { Navbar, NavLink } from 'react-bootstrap'
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountBox from '@material-ui/icons/AccountBox';

export default function Header(props) {

  return (
    <div className='header'>
      <Navbar fixed='bottom' variant='dark' className='header'>
        <NavLink
          href='/profile'
          className='header_settings'>
          <AccountBox className='header-icon' />
        </NavLink>
        <NavLink
          href='/matches'
          className='header_matches'>
          <FavoriteIcon className='header-icon' />
        </NavLink>
      </Navbar>
    </div>
  )
}
