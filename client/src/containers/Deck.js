import React, { useState, useEffect } from 'react';
import '../styles/namecard.scss'
import NameCard from '../components/NameCard';
import Header from '../components/Header';
import Draggable from 'react-draggable';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import {
  setPartner,
  setMatches,
  setLoading,
  getLikedNames,
  getPartnerLikedNames,
} from '../redux/actions';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:4002';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Deck({ user, partner, partnerLikedNames, loading, matches, setPartner, setLoading, setMatches, getPartnerLikedNames, getLikedNames, gender }) {
  const [names, setNames] = useState([]);
  const [seen, setSeen] = useState([]);
  const [liked, setLiked] = useState([]);
  const [newMatch, setNewMatch] = useState(true);

  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [direction, setDirection] = useState(null);

  let filteredNames = filterNames();


  function filterNames() {
    if (names.length && seen.length) {
      const results = names.filter(({ id: id1 }) => !seen.some(({ id: id2 }) => id2 === id1));
      return results;
    } else {
      return names;
    }
  }

  function getNames() {
    axios
      .get(`${BASE_URL}/names/${gender}`)
      .then(allnames => setNames(allnames.data))
      .then(setLoading(false))
      .catch(err => console.error(err))
  }

  function seenNames() {
    axios
      .get(`${BASE_URL}/user/${user.id}/seen`)
      .then(res => setSeen(res.data))
      .catch(err => console.error(err))
  }

  function postSeenNames(userId, nameId) {
    axios
      .post(`${BASE_URL}/user/${userId}/seen/${nameId}`)
      .then(res => res.status <= 400 ? res : Promise.reject(res))
      .catch(err => console.error(err))
  }

  function likedNames() {
    axios
      .get(`${BASE_URL}/user/${user.id}/liked`)
      .then(res => {
        if (res.data && Array.isArray(res.data)) {
          setLiked(res.data)
        }
      })
      .catch(err => console.error(err));
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
    likedNames();
    if (partner) {
      setPartner(user);
      getPartnerLikedNames(user.partnerId);
    };
  }, []);

  // with every new update of liked names, this will run
  useEffect(() => {
    if (liked.length && partnerLikedNames.length) {
      const result = liked.filter(({ id: id1 }) => partnerLikedNames.some(({ id: id2 }) => id2 === id1));
      setMatches(result);
    }
  }, [liked, partnerLikedNames, setMatches])

  const swipe = (direction) => {
    if (direction === "right") {
      setDirection("right");

      postSeenNames(user.id, filteredNames[index].id);
      setSeen(prev => [...prev, filteredNames[index]]);

      postLikedNames(user.id, filteredNames[index].id)
      setLiked(prev => [...prev, filteredNames[index]]);

      const nameArray = partnerLikedNames.map(obj => (obj.name));
      console.log(nameArray)
      console.log(nameArray.includes(filteredNames[index].name), filteredNames[index].name)
      setNewMatch(true)
      if (nameArray.includes(filteredNames[index].name)) {
        alert('matched' + filteredNames[index].name)
      }


    } else {
      setDirection("left");
      postSeenNames(user.id, filteredNames[index].id);
      setSeen(prev => [...prev, filteredNames[index]]);
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

  // const handleClose = () => {
  //   setNewMatch(false);
  // }

function handleClose (){
  setNewMatch(false)
};

  return (
    <>
      { !loading
        ?
        <div>
          <div style={{height:'80%', width:'100%', overflow:'hidden'}}>
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

          </div>
          <Snackbar 
          open={true} 
          autoHideDuration={2000} 
          onClose={handleClose}
          >
            <Alert severity="success">
              It's a Match  <FavoriteBorderIcon />
            </Alert>
          </Snackbar>

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
  matches: state.matches
})

const mapDispatchToProps = (dispatch) => ({
  setPartner: (partnerData) => dispatch(setPartner(partnerData)),
  setLoading: (status) => dispatch(setLoading(status)),
  getLikedNames: (userId) => dispatch(getLikedNames(userId)),
  setMatches: (matches) => dispatch(setMatches(matches)),
  getPartnerLikedNames: (partnerId) => dispatch(getPartnerLikedNames(partnerId)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);

//TODO bug: make game redirect to login if there is no user (authorization)