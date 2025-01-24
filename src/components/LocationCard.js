'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'next/link';
import PropTypes from 'prop-types';

export default function LocationCard({ locationObj }) {
  console.log(locationObj); // logging this now to satisfy the linter, will remove later
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <Card.Title>locationObj.name</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>locationObj.description</Card.Text>
          <Card.Footer>
            <div className="d-flex justify-content-between align-items-center">
              {/* TODO: Comment (2) Link elements back in below once we're able to pass an obj in and they won't be undefined and break the app */}
              {/* 
            <Link href={`/location/${locationObj.firebaseKey}`} passHref> */}
              <Button className="w-auto" variant="primary" size="sm">
                View Location Details
              </Button>
              {/* </Link> */}

              {/* <Link href={`/location/edit/${locationObj.firebaseKey}`} passHref> */}
              <FontAwesomeIcon className="m-2 fa-2x" icon={faPenToSquare} />
              {/* </Link> */}

              {/* TODO: add onClick={deleteLocation} to the button below */}
              <FontAwesomeIcon className="m-2 fa-2x" icon={faTrashCan} />
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}

LocationCard.propTypes = {
  locationObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
