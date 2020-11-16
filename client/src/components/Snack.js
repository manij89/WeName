import React from 'react';
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Snack({open, onClose}) {
  const vertical = 'top';
  const horizontal = 'center';

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={onClose}
      >
        <Alert severity="success">
          It's a Match  <FavoriteBorderIcon />
        </Alert>
      </Snackbar>
    </>
  )
}
