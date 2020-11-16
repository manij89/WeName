import React, { useEffect} from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import '../styles/matches.scss';
import * as actions from '../redux/actions';

function Matches({ matches, user, setMatches, getPartnerLikedNames, partnerLikedNames, getLikedNames, likedNames }) {

  useEffect(() => {
    getLikedNames(user.id);
    if (user.partnerId) { getPartnerLikedNames(user.partnerId) }
  }, [getLikedNames, getPartnerLikedNames, user]);

  useEffect(() => {
    console.log('liked', likedNames, 'partnerLiked', partnerLikedNames)
    if (likedNames.length && partnerLikedNames.length) {
      console.log('liked', likedNames, 'partnerLiked', partnerLikedNames)
      const result = likedNames.filter(({ id: id1 }) => partnerLikedNames.some(({ id: id2 }) => id2 === id1));
      setMatches(result);
    }
  }, [partnerLikedNames, likedNames, setMatches])

  return (
    <>
      <Header />
      {!matches.length
        ?
        <div className='matches'>
          <div className='match'>No matches yet</div>
        </div>

        :
        <div className='matches'>
          {matches.map((match) =>
            <div
            className={match.gender + ' match'}
            key={match.id}
            >
              {match.name}
            </div>
          )}
        </div>
      }

    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  likedNames: state.likedNames,
  partnerLikedNames: state.partnerLikedNames,
  matches: state.matches
})


const mapDispatchToProps = (dispatch) => ({
  setMatches: (matches) => dispatch(actions.setMatches(matches)),
  getPartnerLikedNames: (partnerId) => dispatch(actions.getPartnerLikedNames(partnerId)),
  getLikedNames: (userId) => dispatch(actions.getLikedNames(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);