import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountBox from '@material-ui/icons/AccountBox';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import { useHistory } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';

export default function Header(props) {

  const history = useHistory();

  return (
    <div>
      <Navbar fixed='bottom' variant='dark' className='header' expand='xxl'>
      <Navbar.Brand
      onClick={() => { history.push('/') }}
       >WENAME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              onClick={() => { history.push('/profile') }}
              className='header_settings'>
              <AccountBox className='header-icon' /> Profile
            </Nav.Link>
  
            <Nav.Link 
              onClick={() => { history.push('/game') }}
              className='header_settings'>
              <ChildCareIcon className='header-icon' /> Pick Gender
            </Nav.Link>

            <Nav.Link 
            className='header_settings'
            onClick={() => { history.push('/mynames') }}>
            <ThumbUpIcon className='header-icon' /> My Names
            </Nav.Link>

            <Nav.Link 
            className='header_settings'
            onClick={() => { history.push('/matches') }}>
            <FavoriteIcon className='header-icon' /> Matches
            </Nav.Link>

            <Nav.Link 
            className='header_settings'
            onClick={() => { history.push('/final') }}>
            <StarIcon className='header-icon' /> Your Final Pick
            </Nav.Link>

            <Nav.Link
            className='header_settings'
            onClick={() => { history.push('/') }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}


