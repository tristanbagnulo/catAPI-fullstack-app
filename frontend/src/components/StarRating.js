import React, { useEffect, useState } from 'react';
import FullStar from '../images/star-full.svg'
import EmptyStar from '../images/star-empty.svg'

export default function StarRating(props) {
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
    <div className="App bg-gray-200 my-2 py-1 flex items-center">
      <div className="text-base">{feature}</div>
      <div className="flex">
        {ratingObject.map((booleanValue, index) => (
        <img 
          key={index}
          src={booleanValue ? FullStar : EmptyStar} 
          alt="Star" 
          className='max-w-full h-auto max-h-6'
        />
      ))}
      </div> 
    </div>
  );
}

// export default StarRating;