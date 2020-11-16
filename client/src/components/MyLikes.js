import React, {useEffect, useState} from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import '../styles/matches.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as apiclient from '../services/apiclient';
import * as actions from '../redux/actions';

function Mylikes({ user, likedNames, getLikedNames, setLikes }) {

  useEffect(() => {
    getLikedNames(user.id);
  }, [getLikedNames, user]);

  function handleClick(like) {
    apiclient.deleteName(user.id, like.id);
    const copy = [...likedNames];
    let result = copy.filter((name) => name.id !== like.id);
    setLikes(result);
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
            className={like.gender + ' like'}
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
  getLikedNames: (userId) => dispatch(actions.getLikedNames(userId)),
  setLikes: (likes) => dispatch(actions.setLikes(likes))
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mylikes);