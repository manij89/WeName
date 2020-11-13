import React from 'react';
import '../styles/namecard.scss';
import {Paper} from '@material-ui/core';

export default function NameCard({ names, index, direction }) {

// console.log(names, index)

  return (
    <div className='namecard'>
      <Paper elevation={7} className='name'>
        <div className={direction === "left" ? "left" : direction === "right"
                    ? "right"
                    : "enter"}
          >
        {names.length
        ?
        names[index].name
          :
          'LOADING'
      }

        </div>
      </Paper>
    </div>
  )
}
