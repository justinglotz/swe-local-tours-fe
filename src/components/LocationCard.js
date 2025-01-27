'use client';

import React from 'react';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function LocationCard({ locationObj }) {
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
              <Link href={`/location/${locationObj.id}`} passHref>
                <Button className="w-auto" variant="primary" size="sm">
                  View Location Details
                </Button>
              </Link>

              <div>
                <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                  <Link href={`/location/edit/${locationObj.id}`} passHref>
                    <FontAwesomeIcon className="m-2 fa-2x" icon={faPenToSquare} />
                  </Link>
                </OverlayTrigger>
              </div>

              <div>
                <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                  {/* TODO: add onClick={deleteLocation} to the button below */}
                  <FontAwesomeIcon className="m-2 fa-2x" icon={faTrashCan} />
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
};
