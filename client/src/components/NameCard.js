import React from 'react';
import '../styles/namecard.scss';
import { Paper} from '@material-ui/core';

export default function NameCard({ names, index, direction }) {

  return (
    <div className='namecard'>
      <Paper elevation={7} className='name'>
        <div className={direction === "left" || direction === "right"
          ? direction
          : "enter"}
        >
          {names.length
            ?
            names[index].name
            :
            '...'
          }

        </div> 
      </Paper>
    </div>
  )
}
