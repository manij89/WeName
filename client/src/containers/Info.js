import React from 'react';
import '../styles/info.scss';
import { Link } from 'react-router-dom';
import { Paper, List, ListItemText, ListItem } from '@material-ui/core';

export default function Info() {


  return (
    <div className='info-container'>
      <Paper
        elevation={2}
        className='info-card'
      >
        <h1>Find your favorite baby names</h1>
        <List>
          <div>
            <ListItem>
              <ListItemText
                primary='Register and go to your "Account"'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Share or enter the personal code to play with your partner'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Keep swiping and check your matches'
              />
            </ListItem>
          </div>
        </List>

      <Link to='/register'>
      <button
        className='info-button'
      >Sign up</button>

      </Link>
      </Paper>
    </div>
  )
}
