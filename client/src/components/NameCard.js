import React from 'react';
import '../styles/namecard.scss';
import { Paper} from '@material-ui/core';

export default function NameCard({direction, names, index }) {

  return (
    <div className='namecard'>
      <Paper elevation={7} className='name'>
        <div className={direction === "left" || direction === "right"
          ? direction
          : "enter"}
        >
          {console.log('index card', index, names)}
          {names && names.length ? names[index].name : '...'}
        </div> 
      </Paper>
    </div>
  )
}
