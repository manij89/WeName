import React, {useEffect} from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import '../styles/matches.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as apiclient from '../services/apiclient';
import * as actions from '../redux/actions';

function Mylikes({ user, likedNames, getLikedNames }) {

  useEffect(() => {
    getLikedNames(user.id);
  }, [getLikedNames, user]);

  function handleClick(like) {
    apiclient.deleteName(user.id, like.id);
    getLikedNames(user.id);
  }

  return (
    <>
      <Header />

      {!likedNames.length
        ?
        <div className='likes'>
          <div className='like'>No Likes Yet</div>
        </div>

        :
        <div className='likes'>
          {likedNames.map((like) =>
            <div
              className={like.gender === 'boy'
                ? 'boy like'
                : like.gender === 'girl'
                  ? 'girl like'
                  : 'like'}
              key={like.id}
            >
              {like.name}
              <DeleteForeverIcon onClick={() => handleClick(like)} />
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
  getLikedNames: (userId) => dispatch(actions.getLikedNames(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mylikes);