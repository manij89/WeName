import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import Dragcontainer from '../components/DragContainer';
import { ButtonGroup } from 'react-bootstrap';
import * as apiclient from '../services/apiclient';

function Final({user, partner, partnerLikedNames, loading, setPartner, setLoading, setMatches, getPartnerLikedNames, likedNames, matches, getLikedNames }) {

  const [direction, setDirection] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [index, setIndex] = useState(0);

  const [newMatch, setNewMatch] = useState(false);

  // useEffect(() => {
  //   getLikedNames(user.id);
  //   if (user.partnerId) { getPartnerLikedNames(user.partnerId) }
  // }, [getLikedNames, getPartnerLikedNames, user]);

  // useEffect(() => {
  //   if (likedNames.length && partnerLikedNames.length) {
  //     const result = likedNames.filter(({ id: id1 }) => partnerLikedNames.some(({ id: id2 }) => id2 === id1));
  //     setMatches(result);
  //   }
  // }, [partnerLikedNames, likedNames, setMatches])


  // filteredNames   = filterNames();

  // function filterNames() {
  //   if (names.length && seen.length) {
  //     const results = names.filter(({ id: id1 }) => !seen.some(({ id: id2 }) => id2 === id1));
  //     return results;
  //   } else {
  //     return names;
  //   }
  // }

  const startGame = useCallback(() => {
    getLikedNames(user.id);
    if (partner) {
      setPartner(user);
      getPartnerLikedNames(user.partnerId);
    };
  }, [getPartnerLikedNames, partner, setPartner, user])


  useEffect(() => {
    startGame()
  }, []);

  useEffect(() => {
    console.log('liked', likedNames, 'partner', partnerLikedNames)
    if (likedNames.length && partnerLikedNames.length) {
      const result = likedNames.filter(({ id: id1 }) => partnerLikedNames.some(({ id: id2 }) => id2 === id1));
      setMatches(result);
      setLoading(false);
    }
  }, [likedNames, partnerLikedNames, setMatches])

  const swipe = (direction) => {
    if (direction === "right") {
      setDirection("right");

      // apiclient.postSeenNames(user.id, filteredNames[index].id);
      // setSeen(prev => [...prev, filteredNames[index]]);

      // apiclient.postLikedNames(user.id, filteredNames[index].id)
      // setLiked(prev => [...prev, filteredNames[index]]);

      // const nameArray = partnerLikedNames.map(obj => (obj.name));
      // if (nameArray.includes(filteredNames[index].name)) {
      //   setNewMatch(status => status = true);
      // }

    } else {
      setDirection("left");
      // apiclient.postSeenNames(user.id, filteredNames[index].id);
      // setSeen(prev => [...prev, filteredNames[index]]);
    }

    setTimeout(() => {
      setIndex(index + 1);
      setDirection(null);
      setDragging(false);
    }, 400);
  };

  function handleClose(_, reason) {
    if (reason === 'clickaway') return;
    setNewMatch(status => status = false)
  };

  return (
    <>
      { !loading
        ?
        <div>
          <div className='deck' style={{
            height: '80%',
            width: '100%',
            overflow: 'hidden'
          }}>
            <Dragcontainer
              index={index}
              swipe={swipe}
              direction={direction}
              filteredNames={matches}
            />
            <ButtonGroup swipe={swipe} />
          </div>

        </div>

        :
        //TODO add spinner
        'LOADING.....'
      }
      <Header />
    </>
  )
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  user: state.user,
  partner: state.partner,
  partnerLikedNames: state.partnerLikedNames,
  likedNames: state.likedNames,
  matches: state.matches
})

const mapDispatchToProps = (dispatch) => ({
  setPartner: (partnerData) => dispatch(actions.setPartner(partnerData)),
  setLoading: (status) => dispatch(actions.setLoading(status)),
  getLikedNames: (userId) => dispatch(actions.getLikedNames(userId)),
  setMatches: (matches) => dispatch(actions.setMatches(matches)),
  getPartnerLikedNames: (partnerId) => dispatch(actions.getPartnerLikedNames(partnerId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Final);