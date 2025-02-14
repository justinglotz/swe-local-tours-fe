'use client';

import React, { useEffect, useState } from 'react';
import TourCard from '@/components/TourCard';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { deleteLocation, getSingleLocation } from '@/api/locationData';
import { useRouter } from 'next/navigation';

export default function ViewLocationDetails({ params }) {
  const { id } = params;
  const router = useRouter();

  const [locationDetails, setLocationDetails] = useState({});

  const deleteThisLocation = () => {
    if (window.confirm(`Delete ${locationDetails.name}?`)) {
      deleteLocation(locationDetails.id).then(() => router.push('/locations'));
    }
  };

  useEffect(() => {
    getSingleLocation(id).then((data) => {
      setLocationDetails(data);
    });
  }, [id]);

  const tours = locationDetails.tours || []; // if locationDetails.tours is undefined, set it to an empty array

  console.log('location details:', locationDetails);
  return (
    <div className="location-details-container">
      <div className="location-header">
        <h2>{locationDetails.name}</h2>
        <p className="location-address">
          <FontAwesomeIcon icon={faLocationDot} /> {locationDetails.address}
        </p>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <div>
          <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
            <span>
              <Link href={`/location/edit/${id}`} passHref>
                <FontAwesomeIcon className="m-2 fa-2x" icon={faPenToSquare} style={{ color: 'black', fill: 'black' }} />
              </Link>
            </span>
          </OverlayTrigger>
        </div>

        <div>
          <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
            <button type="button" aria-label="Delete location">
              <FontAwesomeIcon className="m-2 fa-2x" icon={faTrashCan} style={{ color: 'black', fill: 'black' }} onClick={deleteThisLocation} />
            </button>
          </OverlayTrigger>
        </div>
      </div>

      <hr style={{ color: 'black' }} />
      {/* Tours Section */}
      {tours.length > 0 ? (
        <div className="tours-section">
          <h3>Available Tours at {locationDetails.name}:</h3>

          <div className="d-flex flex-wrap tours-container">
            {tours.map((tour) => (
              <TourCard key={tour.id} tourObj={tour} />
            ))}
          </div>
        </div>
      ) : (
        <h2 className="text-center text-black mt-4">No tours currently available at this location.</h2>
      )}
    </div>
  );
}

ViewLocationDetails.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
