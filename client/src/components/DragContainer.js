import React, {useState} from 'react';
import Draggable from 'react-draggable';
import NameCard from '../components/NameCard';

export default function Dragcontainer({index, swipe, filteredNames, direction}) {
  const [dragging, setDragging] = useState(false);

  const handleDrag = (e, d) => {
    // swiping animations
    if (d.x > 50) {
      swipe("right");
    } else if (d.x < -50) {
      swipe("left");
    } else {
      setDragging(false);
    };
  };

  return (
    <>
      <Draggable
        onStart={() => { setDragging(true); }}
        onStop={handleDrag}
        key={index}
        position={dragging ? null : { x: 0, y: 0 }}
      >
        <div>
          <NameCard
            direction={direction}
            names={filteredNames}
            index={index}
            click={swipe}
          />
        </div>
      </Draggable>
    </>
  )
}
