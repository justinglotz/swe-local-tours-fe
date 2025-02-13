'use client';

import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faCircleInfo, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
// import deleteLocationTours from '@/api/mergedData';
import { deleteLocation } from '@/api/locationData';

export default function LocationCard({ locationObj, onUpdate }) {
  const deleteThisLocation = () => {
    if (window.confirm(`Delete ${locationObj.name}?`)) {
      deleteLocation(locationObj.id).then(() => onUpdate());
      // console.log('locationId:', locationObj.id);

      //   deleteLocationTours(locationObj.id).then(() => onUpdate());
    }
  };
  return (
    <div className="w-80 m-3">
      <Card className="text-center border-none rounded-xl bg-white shadow-lg">
        <Card.Header className="font-semibold">
          <Card.Title>{locationObj.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className="text-left transition-colors duration-300">
            {' '}
            <FontAwesomeIcon icon={faLocationDot} /> {locationObj.address}
          </Card.Text>
          <Card.Footer>
            <div className="d-flex justify-content-between align-items-center">
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Details</Tooltip>}>
                <Link href={`/location/${locationObj.id}`} passHref>
                  <FontAwesomeIcon className="m-2 fa-2x" icon={faCircleInfo} />
                </Link>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                <Link href={`/location/edit/${locationObj.id}`} passHref>
                  <FontAwesomeIcon className="m-2 fa-2x" icon={faPenToSquare} />
                </Link>
              </OverlayTrigger>

              <div>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                  <button type="button" aria-label="Delete Location" onClick={deleteThisLocation}>
                    <FontAwesomeIcon className="m-2 fa-2x" icon={faTrashCan} />
                  </button>
                </OverlayTrigger>
              </div>
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}

LocationCard.propTypes = {
  locationObj: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
