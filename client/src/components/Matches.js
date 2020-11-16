import React, {useEffect}  from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { connect } from 'react-redux';
import '../styles/matches.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as actions from '../redux/actions';
const BASE_URL = 'http://localhost:4002';

function Matches({ matches, user, getLikedNames, setMatches }) {

console.log(getLikedNames(user.id));
  async function handleClick(name) {
    //TODO delete function
    axios.delete(`${BASE_URL}/user/${user.id}/liked/${name.id}`)

  }

  useEffect(()=> {
 
  }, [])

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
              className={match.gender === 'boy'
                ? 'boy match'
                : match.gender === 'girl'
                  ? 'girl match'
                  : 'match'}
              key={match.id}
            >
              {match.name}
              <DeleteForeverIcon onClick={() => handleClick(match)} />
            </div>
          )}
        </div>
      }

    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  matches: state.matches
})


const mapDispatchToProps = (dispatch) => ({
  getLikedNames: (userId) => dispatch(actions.getLikedNames(userId)),
  setMatches: (matches) => dispatch(actions.setMatches(matches)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);