import React, { useEffect, useState } from 'react';
import FullStar from './star-full.svg'
import EmptyStar from './star-empty.svg'

export function StarRating(props) {
  const feature = props.feature
  const score = props.score
  const [ratingObject, setRatingObject] = useState([]); // initial rating value


  useEffect(() => {
    if (score) {
      const newRatingObject = [];
      for (let i = 0; i < 5; i++) {
        newRatingObject.push(i < score);
      }
      setRatingObject(newRatingObject);
    }
  }, [score])
  console.log("Score: ", props.score);



  // Catch Rating value

  return (
    <div className='App'>
      <span>{feature}</span>
      <div>
        {ratingObject.map((booleanValue, index) => (
          <img 
            key={index}
            src={booleanValue ? FullStar : EmptyStar} 
            alt="Star" 
            style={{maxWidth: '25px'}}>
          </img>
        ))}
        
      </div>
    </div>
  );
}

// export default StarRating;