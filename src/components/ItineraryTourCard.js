// for use in ininerary page

'use client';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { deleteItinerary, updateItinerary } from '@/api/itineraryData';
import { Badge } from 'react-bootstrap';
import { gsap } from 'gsap';

export default function ItineraryTourCard({ itineraryObj, onUpdate }) {
  const formattedDate = itineraryObj.tour_date ? dayjs(itineraryObj.tour_date).format('ddd, MMMM D, YYYY') : 'No date selected';
  const formattedTime = itineraryObj.tour_time ? dayjs(`2000-01-01 ${itineraryObj.tour_time}`).format('h:mm A') : 'No time selected';
  const isCompleted = itineraryObj.completed === true || itineraryObj.completed === 'true';
  const [completed, setCompleted] = React.useState(isCompleted);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
    // TODO:  Patch the itinerary object with completed
  };

  const deleteThisItinerary = () => {
    if (window.confirm(`Delete ${itineraryObj.name}?`)) {
      deleteItinerary(itineraryObj.id).then(() => onUpdate());
    }
  };

  const handleSaveCheckbox = () => {
    const saveBadge = document.querySelector('.save-badge');
    const originalText = saveBadge.textContent;
    saveBadge.textContent = 'Saved!';
    gsap.fromTo('.save-badge', { scale: 1 }, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
    setTimeout(() => {
      updateItinerary({
        ...itineraryObj,
        completed,
      }).then(() => {
        onUpdate();
        setTimeout(() => {
          saveBadge.textContent = originalText;
        }, 500);
      });
    }, 500);
  };

  return (
    <div className="d-flex justify-content-center">
      {console.log(itineraryObj)}
      <Card className="w-75 mx-auto m-4">
        <Card.Body>
          <div className="flex flex-row">
            <Card.Title className="flex-grow-1">{itineraryObj.tour_name}</Card.Title>
            <Button variant="danger" className="h-1/2 my-auto d-flex align-items-center" onClick={deleteThisItinerary}>
              <FontAwesomeIcon className="m-2" icon={faTrashCan} />
              <span>Delete From Itinerary</span>
            </Button>
            <div className="mx-4">
              <h2>Completed:</h2>
              <Checkbox className="w-100" checked={completed} onChange={handleCheckboxChange} />
              {completed !== isCompleted && (
                <Badge bg="success" className="mx-auto d-block save-badge" onClick={handleSaveCheckbox} style={{ cursor: 'pointer' }}>
                  Save
                </Badge>
              )}
            </div>
            <div className="mx-4">
              <h2>Date:</h2>
              <h2>{formattedDate}</h2>
            </div>
            <div className="mx-4">
              <h2>Time:</h2>
              <h2>{formattedTime}</h2>
            </div>
            <div className="mx-4">
              <h2>Price:</h2>
              <h2>${itineraryObj.tour_price}</h2>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

ItineraryTourCard.propTypes = {
  itineraryObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    tour_name: PropTypes.string,
    tour_date: PropTypes.string,
    tour_time: PropTypes.string,
    completed: PropTypes.string,
    tour_price: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
