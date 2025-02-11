/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faLocationDot, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Link from 'next/link';
import { deleteTour } from '@/api/tourData';
// import { getSingleLocation } from '@/api/locationData';
import { createItinerary } from '@/api/itineraryData';
import { useAuth } from '@/utils/context/authContext';
import { getSingleUser } from '@/api/profileData';

export default function TourCard({ tourObj, onUpdate }) {
  console.log(tourObj);
  const formattedDate = tourObj.date ? dayjs(tourObj.date).format('MMMM D, YYYY') : 'No date selected';
  const formattedTime = tourObj.time ? dayjs(`2000-01-01 ${tourObj.time}`).format('h:mm A') : 'No time selected';

  const deleteThisTour = () => {
    if (window.confirm(`Delete ${tourObj.name}?`)) {
      deleteTour(tourObj.id).then(() => onUpdate());
    }
  };

  // get user object so we can access the id

  const { user } = useAuth();

  const [userData, setUserData] = useState({});

  const getTheSingleUser = () => {
    getSingleUser(user.uid).then((data) => {
      console.log('Fetched User Data:', data);
      setUserData(data[0]);
    });
  };

  useEffect(() => {
    getTheSingleUser();
  }, []);

  // set state for sucess message in UI when adding to itinerary
  const [successMessage, setSuccessMessage] = useState('');

  // const addToItinerary = () => {
  //   getSingleLocation(tourObj.location).then((location) => {
  //     const { address, name } = location;
  //     const payload = {
  //       user_id: userData.id,
  //       tourName: tourObj.name,
  //       completed: false,
  //       tourDate: formattedDate,
  //       tourTime: formattedTime,
  //       tourPrice: tourObj.price,
  //       locationAddress: address,
  //       locationName: name,
  //       tour: tourObj.id,
  //     };
  //     createItinerary(payload); // You can remove this line after verifying the payload
  //   });
  // };

  const addToItinerary = () => {
    const payload = {
      user_id: userData.id,
      tour: tourObj.id,
      completed: false,
    };
    createItinerary(payload).then(() => {
      setSuccessMessage('Tour added to itinerary!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // 3000 milliseconds before the message disappears
    });
  };

  return (
    <div className="w-80 m-3">
      <Card className="text-center border-none rounded-xl" style={{ backgroundColor: '#4e4c76' }}>
        <Card.Header className="font-semibold">{tourObj.name}</Card.Header>
        <Card.Body>
          <Card.Text className="text-left hover:text-blue-500 transition-colors duration-300">
            <Link href={`/location/${tourObj.location}`} passHref>
              <FontAwesomeIcon icon={faLocationDot} /> {tourObj.locationName}
            </Link>
          </Card.Text>
          <div className="flex flex-row">
            <Card.Text className="text-left mx-2">{formattedDate}</Card.Text>
            <Card.Text className="text-left">{formattedTime}</Card.Text>
          </div>
          <Card.Text>${tourObj.price}</Card.Text>
          {/* message when added to itinerary via short-circuit conditional rendering (if successMessage is truthy it is rendered, otherwise it is not) */}
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="flex flex-row gap-4">
            <Button className="w-1/2" variant="contained">
              <Link href={`/tour/${tourObj.id}`} passHref>
                View Tour Details
              </Link>
            </Button>

            <Button className="w-1/2" variant="contained" onClick={addToItinerary}>
              Add To Itinerary
            </Button>
          </div>
          <div className="flex flex-row justify-end">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
              <Link href={`/tour/edit/${tourObj.id}`} passHref>
                <button type="button" aria-label="Edit tour">
                  <FontAwesomeIcon className="m-2 fa-2x" icon={faPenToSquare} />
                </button>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
              <button type="button" aria-label="Delete tour" onClick={deleteThisTour}>
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
    date: PropTypes.string,
    time: PropTypes.string,
    duration: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    location: PropTypes.string,
    id: PropTypes.string,
    locationName: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
