import React, { useEffect } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import axios from 'axios';
const BASE_URL = 'http://localhost:4002';

function Profile({ user, partner, matches }) {



  function getCode() {
    if(!user.data.linkingCode) {
      axios
      .post(`${BASE_URL}/user/${user.data.id}/code`)
      .then(res => res.status <= 400 ? res : Promise.reject(res))
      .then((res) => console.log(res))
      .catch(err => console.error(err))
    }

  }

  getCode()

  return (
    <>
      <Header />
      <h1 className='logo'>WENAME</h1>
      <div className='profile-content'>
        <p>
          Can't wait to find the perfect name with your partner?
          Invite them now!
        </p>

        <p>
          Already have a code?
          Link up now!
        </p>

      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  user: state.user,
  partner: state.partner,
  matches: state.matches
})

const mapDispatchToProps = (dispatch) => ({
  // setLoading: (status) => dispatch(setLoading(status)),
  // setMatches: (matches) => dispatch(setMatches(matches)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);