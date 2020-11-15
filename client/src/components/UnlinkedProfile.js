import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

const BASE_URL = 'http://localhost:4002';

function Unlinkedprofile({user, setUser, setPartner}) {
  const [copied, setCopied] = useState(false);
  // const [code, setCode] = useState('');

  let code = user.linkingCode || '';
  const history = useHistory();


  function handleSubmit(e) {
    e.preventDefault();
    console.log(code);
    linkPartners();
    console.log('user', user)
  }
  
  function linkPartners (){
    axios
      .put(`${BASE_URL}/user/${user.id}/link`,
        { linkingCode: code })
      .then((res) => {
        console.log(res.data.user1)
        setUser(res.data.user2);
        setPartner(res.data.user1)
      })
      .then(console.log('user', user))
      .catch(err => console.error(err))
  }

  return (
    <>
      <h1 className='profile-title'>Invite your partner</h1>
      <div className='profile-content'>
        <p>
          Excited to find the perfect name with your partner?
          Send your partner your invitation code!
        </p>
        <CopyToClipboard
          variant={copied ? 'success' : 'warning'}
          text={code}
          onCopy={() => {setCopied({ copied: true })}}
        >
          <Button>
            Copy your code here
            {copied && <CheckIcon />}
          </Button>
        </CopyToClipboard>
      </div>
      <div>
        <p>
          Already have a code?
          Link up here!
        </p>
        <Form
          onSubmit={handleSubmit}
          onChange={(e) => (code = e.target.value)}
        >
          <Form.Group controlId="linking-code">
            <Form.Control type="text" placeholder="code" />
          </Form.Group>
          <Button
            variant="warning"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  setLoading: (status) => dispatch(actions.setLoading(status)),
  setUser: (userData) => dispatch(actions.setUser(userData)),
  setPartner: (userData) => dispatch(actions.linkPartner(userData))
  // setMatches: (matches) => dispatch(setMatches(matches)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Unlinkedprofile);