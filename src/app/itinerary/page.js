/* eslint-disable react-hooks/exhaustive-deps */
// loop thru to display each on ItineraryTourCard component

'use client';

import ItineraryTourCard from '@/components/ItineraryTourCard';
import React, { useEffect, useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/utils/context/authContext';
import { getSingleUser } from '@/api/profileData';
import { getItineraries } from '@/api/itineraryData';
import { Modal, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

// gmaps variable to turn on and off Google Maps features
const gmaps = true;

export default function ItineraryPage() {
  // get user ID using UseAuth Hook
  const { user } = useAuth();

  const [itinerary, setItinerary] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Get user objects that match my uid
  // Extract the user id from that object
  useEffect(() => {
    if (!user?.uid) return; // Prevent running effect if user is not yet loaded

    getSingleUser(user.uid).then((data) => {
      console.log('Fetched User Data:', data);
      const isComplete = data[0]?.first_name && data[0]?.last_name && data[0]?.bio;
      setUserData(data[0] || null);
      if (!isComplete) setShowModal(true);
    });
  }, [user?.uid]); // Now runs only when user.uid changes

  const handleRedirect = () => {
    setShowModal(false);
    setTimeout(() => {
      router.push('/profile/new');
    }, 300); // 300ms delay
  };

  const getTheItineraries = () => {
    getItineraries().then((data) => {
      setItinerary(data);
    });
  };

  useEffect(() => {
    getTheItineraries();
  }, []);

  console.log('itinerary: ', itinerary);

  return (
    <ProtectedRoute>
      {showModal ? (
        <Modal show={showModal} onHide={handleRedirect} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa', color: '#000' }}>
            <Modal.Title>Profile Incomplete</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#f8f9fa', color: '#000' }}>Please fill out the profile form first.</Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#f8f9fa', color: '#000' }}>
            <Button variant="primary" onClick={handleRedirect}>
              Go to Profile Form
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <div>
          <h1 className="text-center m-4">
            {userData?.first_name} {userData?.last_name}&apos;s Itinerary
          </h1>
          {itinerary.map((item) => (
            <ItineraryTourCard key={item.id} itineraryObj={item} onUpdate={getTheItineraries} />
          ))}
          {gmaps ? (
            <div className="h-[500px] w-3/4 mx-auto m-4 border border-white rounded-lg overflow-hidden">
              <Map defaultZoom={11} defaultCenter={{ lat: 36.16, lng: -86.77 }}>
                {itinerary.map((item) => {
                  if (item.location.coordinates) {
                    const [lat, lng] = item.location.coordinates;
                    return <Marker key={item.id} position={{ lat, lng }} title={`${item.location.name}, ${item.tour.name}`} />;
                  }
                  return null;
                })}
              </Map>
            </div>
          ) : null}
        </div>
      )}
    </ProtectedRoute>
  );
}
