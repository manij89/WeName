import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import NameCard from '../components/NameCard';

export default function Dragcontainer({ index, swipe, names, direction, setDirection, dragging, setDragging}) {
  // const [dragging, setDragging] = useState(false);

  const handleDrag = (e, d) => {
    // swiping animations
    if (d.x > 50) {
      console.log('dragging right')
      swipe("right");
    } else if (d.x < -50) {
      console.log('dragging left')
      swipe("left");
    } else {
      console.log('dragging else')
      setDragging(false);
    };

    setTimeout(() => {
      setDirection(null);
      setDragging(false);
    }, 400)
  };

  return (
    <>
      <Draggable
        onStart={() => { setDragging(true); }}
        onStop={handleDrag}
        // key={index}
        position={dragging ? null : { x: 0, y: 0 }}
      >
        <div>
          {console.log('dragging', dragging)}
          <NameCard
            direction={direction}
            nameObj={names[index]}
            click={swipe}
          />
        </div>
      </Draggable>
    </>
  )
}
