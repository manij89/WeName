import React from 'react';
import '../styles/namecard.scss';
import { Paper} from '@material-ui/core';

export default function NameCard({ names, index, direction, nameObj }) {
  console.log(nameObj)
  return (
    <div className='namecard'>
      <Paper elevation={7} className='name'>
        <div className={direction === "left" || direction === "right"
          ? direction
          : "enter"}
        >
          {/* {names && names.length
            ?
            names[index].name
            :
            '...'
          } */}
          {nameObj && nameObj.name ? nameObj.name : '...'}
        </div> 
      </Paper>
    </div>
  )
}
