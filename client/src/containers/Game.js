import {Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/game.scss';

export default function Game(props) {

  return (
    <div className='game'>
      <Header />
      <h2>What type of name are you looking for?</h2>
      <div className='game-buttons'>
        <div>
        <Link to='game/girl'>
          <button className='gender-button'>Girls</button>
        </Link >
        </div>
        <div>
        <Link to='game/boy'>
          <button className='gender-button'>Boys</button>
        </Link>
        </div>
        <div>
        <Link to='game/neutral'>
          <button className='gender-button'>Neutral</button>
        </Link>
        </div>
      </div>
    </div>
  )
};
