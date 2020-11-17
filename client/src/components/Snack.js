import React from 'react';
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Snack({open, onClose, text}) {
  const vertical = 'top';
  const horizontal = 'center';

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1500}
        onClose={onClose}
      >
        <Alert severity="success">
          {text}  <FavoriteBorderIcon />
        </Alert>
      </Snackbar>
    </>
  )
}
