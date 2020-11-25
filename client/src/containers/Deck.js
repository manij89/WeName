import React, { useState, useEffect } from 'react';
import '../styles/namecard.scss';
import '../styles/game.scss';
import Header from '../components/Header';
import Snack from '../components/Snack';
import ButtonGroup from '../components/buttongroup';
import * as apiclient from '../services/apiclient';
import Draggable from 'react-draggable';
import NameCard from '../components/NameCard';
import {
  setPartner,
  setMatches,
  setLoading,
  getLikedNames,
  getPartnerLikedNames,
} from '../redux/actions';
import { connect } from 'react-redux';

function Deck({ user, partner, partnerLikedNames, loading, setPartner, setLoading, setMatches, getPartnerLikedNames, gender }) {

  const [names, setNames] = useState([]);
  const [seen, setSeen] = useState([]);
  const [liked, setLiked] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [newMatch, setNewMatch] = useState(false);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [direction, setDirection] = useState(null);

  function filterNames(names, seen) {
    if (names.length && seen.length) {
      const results = names.filter(({ id: id1 }) => !seen.some(({ id: id2 }) => id2 === id1));
      console.log('results', results)
      setFilteredNames(results);
    } else {
      console.log('else')
      setFilteredNames(names);
    }
  }


  const startGame = async () => {
    const namestoFilter = await apiclient.getNames(gender, setNames, setLoading);
    const seentoFilter = await apiclient.seenNames(user.id, setSeen);
    filterNames(namestoFilter, seentoFilter)
    await apiclient.likedNames(user.id, setLiked);

    if (partner) {
      setPartner(user);
      getPartnerLikedNames(user.partnerId);
    };
  }

  useEffect(() => {
    startGame()

  }, []);

  // useEffect(() => {
  //   if (isFetched) {
  //     filterNames();
  //   }
  // }, [names, seen, liked])

  // with every new update of liked names, this will run
  useEffect(() => {
    if (liked.length && partnerLikedNames.length) {
      const result = liked.filter(({ id: id1 }) => partnerLikedNames.some(({ id: id2 }) => id2 === id1));
      setMatches(result);
    }
  }, [liked, partnerLikedNames, setMatches, names])


  const swipe = (direction) => {
    console.log('swipe')

    if (direction === "right") {
      setDirection("right");
      apiclient.postSeenNames(user.id, filteredNames[index].id);
      setSeen(prev => [...prev, filteredNames[index]]);
      apiclient.postLikedNames(user.id, filteredNames[index].id)
      setLiked(prev => [...prev, filteredNames[index]]);

      const nameArray = partnerLikedNames.map(obj => (obj.name));
      if (nameArray.includes(filteredNames[index].name)) {
        setNewMatch(status => status = true);
      }

    } else {
      setDirection("left");
      apiclient.postSeenNames(user.id, filteredNames[index].id);
      setSeen(prev => [...prev, filteredNames[index]]);
    }

    console.log('index', index)
    setTimeout(() => {
      console.log('index st', index)
      setIndex((previousIndex) => previousIndex + 1);
      setDirection(null);
      setDragging(false);
    }, 400);
  };

  function handleClose(_, reason) {
    if (reason === 'clickaway') return;
    setNewMatch(status => status = false)
  };

  const handleDrag = (e, d) => {
    // swiping animations
    if (d.x > 70) {
      swipe("right");
    } else if (d.x < -70) {
      swipe("left");
    } else {
      setDragging(false);
    };
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
            <Draggable
              onStart={() => { setDragging(true) }}
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
            <ButtonGroup swipe={swipe} />
          </div>
          <Snack open={newMatch} onClose={handleClose} text='You have a Match' />
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
  getPartnerLikedNames: (partnerId) => dispatch(getPartnerLikedNames(partnerId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
