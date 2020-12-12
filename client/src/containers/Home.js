import React, { useState } from 'react';
import '../styles/home.scss';
import { Wave } from 'react-animated-text';
import stork from '../assets/stork.svg';
import grass from '../assets/grass.svg';

import '../styles/info.scss';
import { Link } from 'react-router-dom';
import { Paper, List, ListItemText, ListItem } from '@material-ui/core';


export default function Home(props) {
  const [inView, setInView] = useState(false);


  return (
    <div>
      <div className={inView ? 'home active' : 'home'}>
        <div className='logo'>
          <Wave
            text='WENAME'
            speed={7}
            effect="verticalFadeIn"
            effectChange={2.5}
            effectDirection='up'
            iterations={1}

          />
        </div>

        <button
          className='home_button'
          onClick={() => setInView(true)}
        >
          Start
      </button>

        <img className='stork' src={stork} alt='stork' />
        <img className='grass' src={grass} alt='grass' />
      </div>

      <div className={inView ? 'info-container active' : 'info-container'}>
        <Paper
          elevation={7}
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
          <div>

            <Link to='/register'>
              <button
                className='info-button'
              >Sign up</button>
            </Link>
            
          </div>
        </Paper>
      </div>
    </div>
  )
}
