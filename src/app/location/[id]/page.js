'use client';

import React, { useEffect, useState } from 'react';
// import TourCard from '@/components/TourCard'
import PropTypes from 'prop-types';
// import viewLocationDetails from '@/api/mergedData';
import { getSingleLocationByPK } from '@/api/locationData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function ViewLocationDetails({ params }) {
  const { id } = params;

  // const [locationDetails, setLocationDetails] = useState({});

  // useEffect(() => {
  //   viewLocationDetails(id).then(setLocationDetails);
  // }, [id]);

  const [singleLocation, setSingleLocation] = useState({});

  useEffect(() => {
    getSingleLocationByPK(id).then((data) => {
      setSingleLocation(data);
    });
  }, [id]);

  // const tours = locationDetails.tours || []; // if locationDetails.tours is undefined, set it to an empty array

  console.log('single location:', singleLocation);
  return (
    <div className="location-details-container">
      <div className="location-header">
        <h2>{singleLocation.name}</h2>
        {/* TODO: get description data in BE so it is accessible here */}
        <p>Description: {singleLocation.description}</p>
        <p className="location-address">
          <FontAwesomeIcon icon={faLocationDot} /> {singleLocation.address}
        </p>
      </div>

      {/* Tours Section */}
      <div className="tours-section">
        <h3>Available Tours at {singleLocation.name}:</h3>
      </div>

      {/* // TODO: add key and tourObj in tour card component below */}
      {/* 
      <h3>Tours at (location):</h3>
      <div className="d-flex flex-wrap">
        {tours.map((tour) => (
          <TourCard key={tour.id} tourObj={tour}/>
        ))}
      </div> */}
    </div>
  );
}

ViewLocationDetails.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
