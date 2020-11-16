import React from 'react';
import '../styles/namecard.scss';
import { Paper, IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

export default function NameCard({ names, index, direction }) {

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
            'LOADING cards'
          }

        </div> 
      </Paper>
    </div>
  )
}
