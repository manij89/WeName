import React from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import '../styles/matches.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Matches({matches}) {
  
function handleClick () {
  //TODO delete function
}

  return (
    <>
      <Header />
     
      {!matches.length
      ?
      <div className='matches'>
        <div className='match'>No matches yet</div>
      </div>
      
      :
      <div className='matches'>
      {matches.map((match) => 
        <div
        className={match.gender === 'boy' 
        ? 'boy match' 
        : match.gender === 'girl' 
        ? 'girl match'
        : 'match'}
        key={match.id} 
        >
          {match.name}
          <DeleteForeverIcon onClick={handleClick}/>
        </div>
      )}
      </div>
      }
 
    </>
  )
}

const mapStateToProps = (state) => ({
  matches: state.matches
})

export default connect(
  mapStateToProps,
)(Matches);