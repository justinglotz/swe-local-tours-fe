import React from 'react';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faLocationDot, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function TourCard({ tourObj }) {
  console.log(tourObj);
  const formattedDate = tourObj.date ? dayjs(tourObj.date).format('MMMM D, YYYY') : 'No date selected';
  const formattedTime = tourObj.time ? dayjs(tourObj.time).format('h:mm A') : 'No time selected';

  return (
    <div className="w-80 m-3">
      <Card className="text-center border-none">
        <Card.Header className="font-semibold">{tourObj.name}</Card.Header>
        <Card.Body>
          <Card.Text className="text-left">
            <FontAwesomeIcon icon={faLocationDot} /> {tourObj.location}
          </Card.Text>
          <div className="flex flex-row">
            <Card.Text className="text-left mx-2">{formattedDate}</Card.Text>
            <Card.Text className="text-left">{formattedTime}</Card.Text>
          </div>
          <Card.Text>${tourObj.price}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="flex flex-row gap-4">
            <Button className="w-1/2">
              <Link href={`/tour/${tourObj.firebaseKey}`} passHref>
                View Tour Details
              </Link>
            </Button>

            <Button className="w-1/2">
              <Link href={`/tour/edit/${tourObj.firebaseKey}`} passHref>
                Add To Itinerary
              </Link>
            </Button>
          </div>
          <div className="flex flex-row justify-end">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
              <Link href={`/tour/${tourObj.firebaseKey}`} passHref>
                <button type="button" aria-label="Edit tour">
                  <FontAwesomeIcon className="m-2 fa-2x" icon={faPenToSquare} />
                </button>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
              <button type="button" aria-label="Delete tour">
                <FontAwesomeIcon className="m-2 fa-2x" icon={faTrashCan} />
              </button>
            </OverlayTrigger>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

TourCard.propTypes = {
  tourObj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    time: PropTypes.instanceOf(Date),
    duration: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
