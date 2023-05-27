import React from 'react';
import PrettyRating from "pretty-rating-react";
import {
  faHeart as farHeart,
  faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";

const icons = {
  star: {
    complete: farStar,
    empty: farStar,
  },
};

const colors = {
 star: ['#d9ad26', '#d9ad26', '#434b4d'],
 heart: ['#9b111e', '#a83f39'],
};

export const StarRating2 = () => (
 <div>
  <div>
   <h1>Assesment</h1>
   <PrettyRating rating={5} icons={icons.star} setColors={colors.star} />
  </div>

  <div>
   <h1>Assesment</h1>
   <PrettyRating rating={3.5} icons={icons.star} setColors={colors.star} />
  </div>
 </div>
);