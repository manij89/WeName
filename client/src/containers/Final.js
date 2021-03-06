import React, { useState, useEffect} from 'react';
import Header from '../components/Header';
import '../styles/matches.scss';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import * as apiclient from '../services/apiclient';
import Counter from '../components/counter';
import Draggable from 'react-draggable';
import NameCard from '../components/NameCard';

function Final({ user, partner, partnerLikedNames, loading, setPartner, setLoading, setMatches, getPartnerLikedNames, likedNames, matches, getLikedNames }) {

  const [direction, setDirection] = useState(null);
  const [dragging, setDragging] = useState(false);

  const startGame = () => {
    getLikedNames(user.id);
    if (partner) {
      setPartner(user);
      getPartnerLikedNames(user.partnerId);
    };
  }

  useEffect(() => {
    startGame()
  }, []);

  useEffect(() => {
    if (likedNames.length && partnerLikedNames.length) {
      const result = likedNames.filter(({ id: id1 }) => partnerLikedNames.some(({ id: id2 }) => id2 === id1));
      setMatches(result);
      setLoading(false);
    }
  }, [likedNames, partnerLikedNames, setMatches, setLoading])

  const swipe = (direction) => {
    if (direction === "right") {
      setDirection("right");
      let copy = [...matches];
      copy.push(matches[0])
      copy.shift();
      setMatches(copy);


    } else {
      setDirection("left");
      let copy = [...matches];
      copy.shift();
      setMatches(copy);
      apiclient.deleteName(user.id, matches[0].id);
    }

    setTimeout(() => {
      setDirection(null);
      setDragging(false);
    }, 400)
  };

  const handleDrag = (e, d) => {
    // swiping animations
    if (d.x > 80) {
      swipe("right");
    } else if (d.x < -80) {
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
            overflowY: 'hidden'
          }}>
            <Draggable
              onStart={() => { setDragging(true); }}
              onStop={handleDrag}
              key={matches.length}
              position={dragging ? null : { x: 0, y: 0 }}
            >
              <div>
                <NameCard
                  direction={direction}
                  names={matches}
                  index={0}
                />
              </div>
            </Draggable>
            <Counter matches={matches} />
          </div>
        </div>
        :
        'LOADING..'
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