import React, {useEffect, useState} from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import '../styles/matches.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as apiclient from '../services/apiclient';
import * as actions from '../redux/actions';

function Mylikes({ user, likedNames, getLikedNames, setLikes }) {
  const [deletingName,setDeletingName]=useState("")

  useEffect(() => {
    getLikedNames(user.id);
  }, [getLikedNames, user]);


  function handleClick(like) {
    apiclient.deleteName(user.id, like.id);
    setDeletingName(like.id)
    setTimeout(()=>{
      const copy = [...likedNames];
      let result = copy.filter((name) => name.id !== like.id);
      setLikes(result);
      setDeletingName('')
    },1500)
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
            className={deletingName === like.id ? 
              like.gender + ' like delete':
              like.gender + ' like'}
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