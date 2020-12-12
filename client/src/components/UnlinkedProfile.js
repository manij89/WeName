import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CheckIcon from '@material-ui/icons/Check';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import * as apiclient from '../services/apiclient';

function Unlinkedprofile({user, setUser, setPartner}) {
  const [copied, setCopied] = useState(false);
  let code = user.linkingCode || '';

  function handleSubmit(e) {
    e.preventDefault();
    apiclient.linkPartners(user.id, code, setUser, setPartner);
  }
  
  return (
    <>
    <div className='profile'>
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
          <Button
          className='profile-button'
          >
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
            className='profile-button'
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Unlinkedprofile);