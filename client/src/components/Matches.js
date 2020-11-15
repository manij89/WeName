import React from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

function Matches({matches}) {
  
console.log(matches)

  return (
    <>
      <Header />
    
      <div>Matches</div>
      {matches.map((match) => 
        <li key={match.id} >{match.name}</li>
      )}

      
  
    </>
  )
}

const mapStateToProps = (state) => ({
  matches: state.matches
})

export default connect(
  mapStateToProps,
)(Matches);