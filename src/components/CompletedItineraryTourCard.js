'use client';

import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function CompletedItineraryTourCard({ completedObj }) {
  const formattedDate = completedObj.tour.date ? dayjs(completedObj.tour.date).format('ddd, MMM D, YYYY') : 'No date selected';
  const formattedTime = completedObj.tour.time ? dayjs(`2000-01-01 ${completedObj.tour.time}`).format('h:mm A') : 'No time selected';

  return (
    <div className="d-flex justify-content-center">
      <Card className="m-3 p-3" style={{ width: '250px', height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Card.Body>
          <Card.Title>{completedObj.tour.name}</Card.Title>
          <Card.Text>
            <FontAwesomeIcon icon={faLocationDot} /> {completedObj.location.name}
          </Card.Text>
          <Card.Text>{formattedDate}</Card.Text>
          <Card.Text>{formattedTime}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

CompletedItineraryTourCard.propTypes = {
  completedObj: PropTypes.shape({
    tour: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
