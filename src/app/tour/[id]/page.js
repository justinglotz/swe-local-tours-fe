'use client';

// view tour details here
// put JSX here directly, no other component used in here
import React, { useEffect, useState } from 'react';
import { getSingleTour } from '@/api/tourData';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

export default function TourDetailsPage({ params }) {
  const [tour, setTour] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleTour(id).then((data) => {
      console.log(data);
      setTour(data);
    });
  }, [id]);

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
      <img src={tour.image} alt={tour.name} />
      <p>Location: {tour.locationName}</p>
    </div>
  );
}

TourDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
