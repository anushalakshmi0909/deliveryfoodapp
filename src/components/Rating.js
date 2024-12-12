// Rating.js
import React from 'react';
import { Rating as MuiRating } from '@mui/material';

const Rating = ({ rating, setRating }) => {
  return (
    <div>
      <MuiRating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        precision={0.5}
        size="large"
      />
      <p>Your Rating: {rating}</p>
    </div>
  );
};

export default Rating;
