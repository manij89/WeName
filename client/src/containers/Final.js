import React, {useState} from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import Deck from '../containers/Deck';
import Dragcontainer from '../components/DragContainer';
import { ButtonGroup } from 'react-bootstrap';
// import * as apiclient from '../services/apiclient';

export default function Final({matches, user, partner, partnerLikedNames, loading, setPartner, setLoading, setMatches, getPartnerLikedNames, gender }) {

  const [direction, setDirection] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [index, setIndex] = useState(0);

  const swipe = (direction) => {
    if (direction === "right") {
      setDirection("right");
      // TODO 

      // apiclient.postSeenNames(user.id, filteredNames[index].id);
      // setSeen(prev => [...prev, filteredNames[index]]);

      // apiclient.postLikedNames(user.id, filteredNames[index].id)
      // setLiked(prev => [...prev, filteredNames[index]]);

      // const nameArray = partnerLikedNames.map(obj => (obj.name));
      // if (nameArray.includes(filteredNames[index].name)) {
      //   setNewMatch(status => status = true);
      // }

    } else {
      // setDirection("left");
      // apiclient.postSeenNames(user.id, filteredNames[index].id);
      // setSeen(prev => [...prev, filteredNames[index]]);
    }

    setTimeout(() => {
      setIndex(index + 1);
      setDirection(null);
      setDragging(false);
    }, 400);
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

// const mapStateToProps = (state) => ({
//   loading: state.loading,
//   matches: state.matches,
//   user: state.user,
//   partner: state.partner
// })

// const mapDispatchToProps = (dispatch) => ({
//   setPartner: (partnerData) => dispatch(actions.setPartner(partnerData)),
//   setLoading: (status) => dispatch(actions.setLoading(status)),
//   getLikedNames: (userId) => dispatch(actions.getLikedNames(userId)),
//   setMatches: (matches) => dispatch(actions.setMatches(matches)),
//   getPartnerLikedNames: (partnerId) => dispatch(actions.getPartnerLikedNames(partnerId))
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Final);
