import React from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

function Matches({matches}) {
  


  return (
    <>
      <Header />
      <div>Matches page</div>
      {matches.map((match) => {
        <li>match.name</li>
      })}
    </>
  )
}

const mapStateToProps = (state) => ({
  matches: state.matches
})

export default connect(
  mapStateToProps,
)(Matches);