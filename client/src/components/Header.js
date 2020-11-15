import React, { useEffect } from 'react';
import { Navbar, NavLink } from 'react-bootstrap'
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountBox from '@material-ui/icons/AccountBox';
import {connect} from 'react-redux';
import {setUser} from '../redux/actions';
import { useHistory } from "react-router-dom";

export default function Header(props) {

const history = useHistory();

  return (
    <div>
      <Navbar fixed='bottom' variant='dark' className='header'>
        <NavLink
          onClick={()=>{history.push('/profile')}}
          className='header_settings'>
          <AccountBox className='header-icon' />
        </NavLink>
        <NavLink
          style={{color: 'white'}}
          onClick={()=>{history.push('/game')}}
          className='header_matches'>
          WENAME
        </NavLink>
        <NavLink
          onClick={()=>{history.push('/matches')}}
          className='header_matches'>
          <FavoriteIcon className='header-icon' />
        </NavLink>
      </Navbar>
    </div>
  )
}

// const mapDispatchToProps = (dispatch) => ({
//   setUser: (userData) => dispatch(setUser(userData)),
// })

// export default connect(
//   mapDispatchToProps
// )(Header);
