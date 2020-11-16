import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import '../styles/matches.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Mylikes({user, likedNames}) {
  
  function handleClick (){
    console.log('deleted')
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
              <DeleteForeverIcon onClick={handleClick}/>
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


// const mapDispatchToProps = (dispatch) => ({
//   setMatches: (matches) => dispatch(actions.setMatches(matches)),
//   getPartnerLikedNames: (partnerId) => dispatch(actions.getPartnerLikedNames(partnerId)),
//   getLikedNames: (userId) => dispatch(actions.getLikedNames(userId))
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Mylikes);