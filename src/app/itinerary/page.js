/* eslint-disable react-hooks/exhaustive-deps */
// loop thru to display each on ItineraryTourCard component

'use client';

import ItineraryTourCard from '@/components/ItineraryTourCard';
import React, { useEffect, useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';
// import { getItinerariesByUid } from '@/api/itineraryData';
import { useAuth } from '@/utils/context/authContext';
import { getSingleUser } from '@/api/profileData';
import itineraryData from '@/utils/sample-data/itinerary.json';

// gmaps variable to turn on and off Google Maps features
const gmaps = true;

export default function ItineraryPage() {
  // get user ID using UseAuth Hook
  const { user } = useAuth();

  const [itinerary, setItinerary] = useState([]);
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

  // const getTheItineraries = () => {
  //   getItinerariesByUid().then((data) => {
  //     setItinerary(data);
  //   });
  // };

  const getTheItineraries = () => {
    setItinerary(itineraryData);
  };

  useEffect(() => {
    getTheItineraries();
  }, []);

  console.log('itinerary: ', itinerary);

  return (
    <div>
      <h1 className="text-center m-4">
        {userData.first_name} {userData.last_name}&apos;s Itinerary
      </h1>
      {itinerary.map((item) => (
        <ItineraryTourCard key={item.id} itineraryObj={item} onUpdate={getTheItineraries} />
      ))}
      {gmaps ? (
        <div className="h-[500px] w-3/4 mx-auto m-4 border border-white rounded-lg overflow-hidden">
          <Map defaultZoom={12} defaultCenter={{ lat: 36.16, lng: -86.77 }}>
            {itinerary.map((item) => {
              if (item.coord) {
                return <Marker key={item.id} position={item.coord} title={item.location_name} />;
              }
              return null;
            })}
          </Map>
        </div>
      ) : null}
    </div>
  );
}
