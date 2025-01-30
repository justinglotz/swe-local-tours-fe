'use client';

// view tour details here
// put JSX here directly, no other component used in here
import React, { useEffect, useState } from 'react';
import { getSingleTour } from '@/api/tourData';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { getSingleLocation } from '@/api/locationData';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';

export default function TourDetailsPage({ params }) {
  const [tour, setTour] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleTour(id).then((data) => {
      getSingleLocation(data.location).then((locationData) => {
        setTour({ ...data, locationName: locationData.name, locationAddress: locationData.address });
      });
    });
  });

  const tourDateObj = dayjs(tour.date).format('ddd, MMM D YYYY');
  const tourTimeObj = dayjs(`2000-01-01 ${tour.time}`).format('h:mm A');

  return (
    <div className="flex flex-wrap flex-col">
      <Row>
        <Col className="col-4">
          <div className="h-[33vh]">
            <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
          </div>
        </Col>
        <Col className="col-4" />
        <Col className="col-4 d-flex flex-column justify-content-end">
          <button type="button" className="btn btn-primary">
            Add to Itinerary
          </button>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <div className="h-[66vh]">
            <div>
              <h1 className="text-center text-2xl">{tour.name}</h1>
            </div>
            <p className="text-center">Date: {tourDateObj}</p>
            <p className="text-center">Time: {tourTimeObj}</p>
          </div>
        </Col>
        <Col className="col-8">
          <Card className="h-100" bg="dark" text="white">
            <Card.Body>
              <Card.Title className="text-6xl">TOUR DETAILS</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                <p>Location: {tour.locationName}</p>
                <p>Address: {tour.locationAddress}</p>
                <p>Duration: {tour.duration} minutes</p>
                <p>Price: ${tour.price}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

TourDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
