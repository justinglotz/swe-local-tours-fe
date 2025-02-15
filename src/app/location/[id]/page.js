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
import { Button } from '@mui/material';
import { Map, Marker } from '@vis.gl/react-google-maps';

const gmaps = true;
export default function ViewLocationDetails({ params }) {
  const { id } = params;
  const router = useRouter();

  const [locationDetails, setLocationDetails] = useState({});
  const [coordinates, setCoordinates] = useState(null);

  const deleteThisLocation = () => {
    if (window.confirm(`Delete ${locationDetails.name}?`)) {
      deleteLocation(locationDetails.id).then(() => router.push('/locations'));
    }
  };

  useEffect(() => {
    getSingleLocation(id).then((data) => {
      setLocationDetails(data);
      if (gmaps) {
        setCoordinates(locationDetails.coordinates ? { lat: locationDetails.coordinates[0], lng: locationDetails.coordinates[1] } : { lat: -33.860664, lng: 151.208138 }); // fallback coordinates if geocoding fails
      }
    });
  }, [id]);

  const tours = locationDetails.tours || []; // if locationDetails.tours is undefined, set it to an empty array

  console.log('location details:', locationDetails);
  return (
    <>
      <div className="location-details-container">
        <div className="location-header">
          <h2>{locationDetails.name}</h2>
          <p className="location-address">
            <FontAwesomeIcon icon={faLocationDot} /> {locationDetails.address}
          </p>
        </div>

        {/* render the map */}
        <div className="h-3/4 rounded-lg overflow-hidden" style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          {coordinates && ( // Only render map when coordinates exist
            <Map
              defaultZoom={15} // Increased zoom level for better visibility
              defaultCenter={coordinates}
            >
              <Marker position={coordinates} title={locationDetails.name} />
            </Map>
          )}
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

      <div className="mt-auto pb-4" style={{ paddingLeft: '1100px' }}>
        <Link href="/locations" passHref>
          <Button
            // sx={{
            //   width: '128px',
            //   transition: 'width 0.2s ease-in-out',
            //   '&:hover': {
            //     width: '100%',
            //   },
            // }}
            style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--text-color)' }}
            type="button"
          >
            Back to Locations
          </Button>
        </Link>
      </div>
    </>
  );
}

ViewLocationDetails.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
