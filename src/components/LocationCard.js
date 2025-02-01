'use client';

import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import deleteLocationTours from '@/api/mergedData';

export default function LocationCard({ locationObj, onUpdate }) {
  const deleteThisLocation = () => {
    console.log('locationId:', locationObj.id);
    if (window.confirm(`Delete ${locationObj.name}?`)) {
      deleteLocationTours(locationObj.id).then(() => onUpdate());
    }
  };
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <Card.Title>{locationObj.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{locationObj.address}</Card.Text>
          <Card.Footer>
            <div className="d-flex justify-content-between align-items-center">
              <OverlayTrigger overlay={<Tooltip>Details</Tooltip>}>
                <Link href={`/location/${locationObj.id}`} passHref>
                  <FontAwesomeIcon className="m-2 fa-2x" icon={faCircleInfo} />
                </Link>
              </OverlayTrigger>
              <div>
                <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                  <Link href={`/location/edit/${locationObj.id}`} passHref>
                    <FontAwesomeIcon className="m-2 fa-2x" icon={faPenToSquare} />
                  </Link>
                </OverlayTrigger>
              </div>

              <div>
                <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
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
