import React, { useState, useEffect } from 'react';
import '../styles/namecard.scss'
import NameCard from './NameCard';
import Header from './Header';
import Draggable from 'react-draggable';
import axios from 'axios';
import {
  setPartner,
  findMatches,
  setLoading,
  getLikedNames,
  getPartnerLikedNames,
} from '../redux/actions';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:4002';

function Deck(props) {
  const [names, setNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState([])
  const [seen, setSeen] = useState([]);
  const [liked, setLiked] = useState([]);

  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [direction, setDirection] = useState(null);

  // all names ('return' returns a promise, so getNames() and seenNames() are chainable)
  function getNames() {
    return axios
      .get(`${BASE_URL}/names/${props.gender}`)
      .then(allnames => setNames(allnames.data))
      .then(props.setLoading(false))
      .catch(err => console.error(err))
  }

  // already seen names
  function seenNames() {
    return axios
      .get(`${BASE_URL}/user/${props.user.data.id}/seen`)
      .then(res => setSeen(res.data))
      .catch(err => console.error(err))
  }

  function postSeenNames(userId, nameId) {
    axios
      .post(`${BASE_URL}/user/${userId}/seen/${nameId}`)
      .then(res => res.status <= 400 ? res : Promise.reject(res))
      .catch(err => console.error(err))
  }

  function postLikedNames(userId, nameId) {
    axios
      .post(`${BASE_URL}/user/${userId}/liked/${nameId}`)
      .then(res => res.status <= 400 ? res : Promise.reject(res))
      .catch(err => console.error(err)) 
  }

  useEffect(() => {
    getNames();
    seenNames();
    props.getLikedNames(props.user.data.id);
    if (props.user.data.partnerId) {
      props.setPartner(props.user);
      props.getPartnerLikedNames(props.user.data.partnerId)
    };
  }, []);

  useEffect(() => {
    console.log('seen', seen)
    if (names.length && seen.length) {
      console.log(names, seen)
      const results = names.filter(({ id: id1 }) => !seen.some(({ id: id2 }) => id2 === id1));
      console.log(results)
      setFilteredNames(results);
    } else {
      setFilteredNames(names)
    }
  }, [names, seen]);

  useEffect(() => {
    if (props.user.data.partnerId) props.findMatches()
  }, []);

  const swipe = (direction) => {
    if (direction === "right") {
      setDirection("right");
      //TODO set liked/matched
      postSeenNames(props.user.data.id, filteredNames[index].id);
      setSeen([...seen,filteredNames[index]]);

      postLikedNames(props.user.data.id, filteredNames[index].id)
      setLiked([...liked,filteredNames[index]]);

      console.log('swiped right')
    } else {
      setDirection("left");
      postSeenNames(props.user.data.id, filteredNames[index].id);
      setSeen([...seen,filteredNames[index]]);
    }
    setTimeout(() => {
      setIndex(index + 1);
      setDirection(null);
      setDragging(false);
    }, 400);
  };

  const handleDrag = (e, d) => {
    // swiping animations
    if (d.x > 50) {
      swipe("right");
    } else if (d.x < -50) {
      swipe("left");
    } else {
      setDragging(false);
    };

  };
  return (
    <>
      { !props.loading
        ?
        <Draggable
          onStart={() => { setDragging(true); }}
          onStop={handleDrag}
          key={index}
          position={dragging ? null : { x: 0, y: 0 }}
        >
          <div>
            <NameCard
              direction={direction}
              names={filteredNames}
              index={index}
            />
          </div>
        </Draggable>
        :
        //TODO add spinner
        'LOADING...'
      }
      <Header />
    </>
  )
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  user: state.user,
  partner: state.partner,
  likedNames: state.likedNames,
  partnerLikedNames: state.partnerLikedNames,
  matches: state.mapDispatchToProps
})

const mapDispatchToProps = (dispatch) => ({
  setPartner: (partnerData) => dispatch(setPartner(partnerData)),
  setLoading: (status) => dispatch(setLoading(status)),
  getLikedNames: (userId) => dispatch(getLikedNames(userId)),
  findMatches: () => dispatch(findMatches()),
  getPartnerLikedNames: (partnerId) => dispatch(getPartnerLikedNames(partnerId)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);

//TODO bug: make game redirect to login if there is no user (authorization)