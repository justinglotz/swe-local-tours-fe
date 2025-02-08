'use client';

import React, { useEffect, useState } from 'react';
import { getSingleTour } from '@/api/tourData';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { getSingleLocation } from '@/api/locationData';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { Map, Marker } from '@vis.gl/react-google-maps';
import createItinerary from '@/api/itineraryData';

const gmaps = true;

export default function TourDetailsPage({ params }) {
  const [tour, setTour] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleTour(id).then((data) => {
      getSingleLocation(data.location).then(async (locationData) => {
        // Set all data together including coordinates
        if (gmaps) {
          setTour({
            ...data,
            locationName: locationData.name,
            locationAddress: locationData.address,
            coordinates: locationData.coordinates ? { lat: locationData.coordinates[0], lng: locationData.coordinates[1] } : { lat: -33.860664, lng: 151.208138 }, // fallback coordinates if geocoding fails
          });
        } else {
          setTour({
            ...data,
            locationName: locationData.name,
            locationAddress: locationData.address,
          });
        }
      });
    });
  }, [id]);

  const addToItinerary = () => {
    createItinerary(tour);
  };

  const tourDateObj = dayjs(tour.date).format('ddd, MMM D YYYY');
  const tourTimeObj = dayjs(`2000-01-01 ${tour.time}`).format('h:mm A');

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] overflow-hidden">
      {/* Top section - 33vh */}
      <div className="h-1/3">
        <Row className="h-full">
          <Col className="col-4 h-full">
            <div className="h-full">
              <img src={tour.image} alt={tour.name} className="w-full h-full object-cover rounded-xl" />
            </div>
          </Col>
          <Col className="col-4" />
          <Col className="col-4 d-flex flex-col justify-end pb-4">
            <button type="button" className="btn btn-primary" onClick={addToItinerary}>
              Add to Itinerary
            </button>
          </Col>
        </Row>
      </div>

      {/* Bottom section - 66vh */}
      <div className="h-2/3">
        <Row className="h-full">
          <Col className="col-4 d-flex flex-col">
            <div className="flex-grow">
              <div>
                <h1 className="text-center text-2xl">{tour.name}</h1>
              </div>
              <p className="text-center">Date: {tourDateObj}</p>
              <p className="text-center">Time: {tourTimeObj}</p>
            </div>
            <div className="mt-auto pb-4">
              <Link href="/tours" passHref>
                <button className="btn btn-info hover:w-full" type="button">
                  Back to Tours
                </button>
              </Link>
            </div>
          </Col>
          <Col className="col-8 h-full">
            <Card className="h-full rounded-xl" bg="dark" text="white">
              <Card.Body className="d-flex flex-col">
                <Card.Title className="text-6xl">TOUR DETAILS</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text className="flex-grow">
                  <p>Location: {tour.locationName}</p>
                  <p>Duration: {tour.duration} minutes</p>
                  <p>Price: ${tour.price}</p>
                  <p>Address: {tour.locationAddress}</p>
                  <div className="h-3/4 rounded-lg overflow-hidden">
                    {tour.coordinates && ( // Only render map when coordinates exist
                      <Map
                        defaultZoom={15} // Increased zoom level for better visibility
                        defaultCenter={tour.coordinates}
                      >
                        <Marker position={tour.coordinates} title={tour.locationName} />
                      </Map>
                    )}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

TourDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};
