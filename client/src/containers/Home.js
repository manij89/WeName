import React from 'react';
import '../styles/home.scss';
import { Link } from 'react-router-dom';
import { Wave } from 'react-animated-text';
import stork from '../assets/stork.svg';
import grass from '../assets/grass.svg';


export default function Home(props) {
  

  return (
    <div className='home'>
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
      <Link to='/info'>
      <button className='home_button'>
        Start
      </button>
      </Link>
      <img className='stork' src={stork} alt='stork'/>
      <img className='grass' src={grass} alt='grass'/>
    </div>
  )
}
