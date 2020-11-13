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
  getSeenNames,
  getLikedNames,
  getPartnerLikedNames,
  // updateSeenNames
} from '../redux/actions';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:4002';

function Deck(props) {
  const [names, setNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [direction, setDirection] = useState(null);
  const [loading, setLoading] = useState(false);

  function getNames() {
    setLoading(true)
    axios
      .get(`${BASE_URL}/names/${props.gender}`)
      .then(allnames => {
        // console.log(allnames.data)
        setNames(allnames.data)
        setLoading(false)
      })

  };

  function postSeenNames(userId, nameId) {
    axios
      .post(`${BASE_URL}/user/${userId}/seen/${nameId}`)
      .then((userId) => {
        console.log('trying to get seen names')
        return (props.getSeenNames(userId))
      }
      )
  }

  useEffect(() => {
  
    setTimeout(() => getNames(), 300)
    // console.log('names', names)

  }, []);

  useEffect(() => {
    props.getSeenNames(props.user.data.id);
  }, []);

  useEffect(() => {
    const seen = props.seenNames.data || [];
    const copy = [...names];
    console.log('seen', seen)
    // TODO breaks with new user
    if(seen.length) {
      const results = copy.filter(({ id: id1 }) => !seen.some(({ id: id2 }) => id2 === id1));
      console.log(results, "results")
      setFilteredNames(prev => prev = results)
    } else {
      setFilteredNames(names);
    }
    props.setLoading(false);
  }, [names])

useEffect(() => {
  if (props.user.data.partnerId) props.setPartner(props.user)
}, []);


useEffect(() => {
  props.getLikedNames(props.user.data.id)
}, []);

useEffect(() => {
  if (props.user.data.partnerId) props.getPartnerLikedNames(props.user.data.partnerId)
}, []);

useEffect(() => {
  if (props.user.data.partnerId) props.findMatches()
}, []);


const swipe = (direction) => {
  if (direction === "right") {
    setDirection("right");
    //TODO set seen/liked/matched
    console.log('swiped right')
  } else {
    setDirection("left");
    console.log('swiped left')
    postSeenNames(props.user.data.id, names[index].id);
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
    { !loading
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
  seenNames: state.seenNames,
  likedNames: state.likedNames,
  partnerLikedNames: state.partnerLikedNames,
  matches: state.mapDispatchToProps
})

const mapDispatchToProps = (dispatch) => ({
  setPartner: (partnerData) => dispatch(setPartner(partnerData)),
  setLoading: (status) => dispatch(setLoading(status)),
  getSeenNames: (userId) => dispatch(getSeenNames(userId)),
  getLikedNames: (userId) => dispatch(getLikedNames(userId)),
  findMatches: () => dispatch(findMatches()),
  // updateSeenNames: (name) => dispatch(updateSeenNames(name)),
  getPartnerLikedNames: (partnerId) => dispatch(getPartnerLikedNames(partnerId)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);

//TODO bug: make game redirect to login if there is no user (authorization)