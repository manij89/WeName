import React from 'react';

export default function Counter({matches}) {


  return (
    <>
    {matches !== 1
    ?
      <div className='final-count'>
        Matches left: {matches.length}
      </div>
    :

    <div className='final-end final-count'>
      Your Final Pick is {matches[0].name}
    </div>

    }
    </>
  )
}
