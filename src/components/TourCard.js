import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function TourCard() {
  return (
    <div className="w-80 m-3">
      <Card className="text-center border-none">
        <Card.Header className="font-semibold">Moths of Shelby Park</Card.Header>
        <Card.Body>
          <Card.Text className="text-left">
            <FontAwesomeIcon icon={faLocationDot} /> Shelby Park
          </Card.Text>
          <div className="flex flex-row">
            <Card.Text className="text-left mx-2">1/20/2025</Card.Text>
            <Card.Text className="text-left">1:00 PM</Card.Text>
          </div>
          <Card.Text>$20</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="flex flex-row gap-4">
            <Button className="w-1/2">View Tour Details</Button>
            <Button className="w-1/2">Add To Itinerary</Button>
          </div>
          <div className="flex flex-row justify-end">
            <FontAwesomeIcon className="m-2 fa-2x" icon={faPenToSquare} />
            <FontAwesomeIcon className="m-2 fa-2x" icon={faTrashCan} />
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
