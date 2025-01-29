'use client';

// view tour details here
// put JSX here directly, no other component used in here
import React, { useEffect, useState } from 'react';
import { getSingleTour } from '@/api/tourData';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

export default function TourDetailsPage({ params }) {
  const [tour, setTour] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleTour(firebaseKey).then((data) => {
      setTour(data);
    });
  }, [firebaseKey]);

  const tourDateObj = dayjs(tour.date).format('YYYY-MM-DD');
  const tourTimeObj = dayjs(tour.time).format('h:mm A');

  return (
    <div>
      <h1>{tour.name}</h1>
      <p>{tour.description}</p>
      <p>Date: {tourDateObj}</p>
      <p>Time: {tourTimeObj}</p>
      <p>Duration: {tour.duration}</p>
      <p>Price: {tour.price}</p>
      <img src={tour.imageUrl} alt={tour.name} />
      <p>Location: {tour.location}</p>
    </div>
  );
}

TourDetailsPage.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }),
};
