import React from 'react';
import '../styles/namecard.scss';
import { Paper} from '@material-ui/core';

export default function NameCard({direction, names, index }) {
  console.log('names', names)
  return (
    <div className='namecard'>
      <Paper elevation={7} className='name'>
        <div className={direction === "left" || direction === "right"
          ? direction
          : "enter"}
        >
          {names && names.length ? names[index].name : '...'}
        </div> 
      </Paper>
    </div>
  )
}
