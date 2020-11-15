import React, { useEffect } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

import { useHistory } from "react-router-dom";
import UnlinkedProfile from '../components/UnlinkedProfile';

import * as actions from '../redux/actions';
import '../styles/profile.scss';


function Profile({ user, partner, matches, loading, setLoading, setPartner}) {

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    if (!user.email) {
      history.push('/login');
    } else if  (user.partnerId) {
      setPartner(user);
    }
    setLoading(false);
  }, [])

  return (
    <>{
      !loading
      ?
      <>
      <Header />

        {!partner.id && user ? <UnlinkedProfile /> : <p>You are linked up with {partner.firstName}</p>
        }
      </>
      :
      // TODO ad spinner
      'LOADING'
    }
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
  setLoading: (status) => dispatch(actions.setLoading(status)),
  getUser: (userData) => dispatch(actions.getUser(userData)),
  setPartner: (userData) => dispatch(actions.setPartner(userData))
  // setMatches: (matches) => dispatch(setMatches(matches)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);