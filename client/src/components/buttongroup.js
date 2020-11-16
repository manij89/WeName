import React from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

export default function Buttongroup({swipe}) {

  return (
    
      <div className='card-buttons'>
        <IconButton
          onClick={() => swipe('right')}
          className='card-button'>
          <ThumbUpIcon className='card-icon' />
        </IconButton>
        <IconButton
          onClick={() => swipe('left')}
          className='card-button'>
          <ThumbDownIcon className='card-icon' />
        </IconButton>
      </div>
  )
}
