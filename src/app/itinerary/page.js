// loop thru to display each on ItineraryTourCard component

'use client';

import ItineraryTourCard from '@/components/ItineraryTourCard';
import React, { useEffect, useState } from 'react';
import userData from '@/utils/sample-data/users.json';
import itineraryData from '@/utils/sample-data/itinerary.json';
import { Map, Marker } from '@vis.gl/react-google-maps';

// gmaps variable to turn on and off Google Maps features
const gmaps = true;

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState([]);

  const getTheItinerary = () => {
    setItinerary(itineraryData);
  };

  useEffect(() => {
    getTheItinerary();
  }, [itinerary]);

  console.log(itinerary);

  return (
    <div>
      <h1 className="text-center m-4">
        {userData.first_name} {userData.last_name}&apos;s Itinerary
      </h1>
      {itinerary.map((item) => (
        <ItineraryTourCard key={item.id} itineraryObj={item} onUpdate={getTheItinerary} />
      ))}
      {gmaps ? (
        <div className="h-[500px] w-3/4 mx-auto m-4 border border-white rounded-lg overflow-hidden">
          <Map defaultZoom={12} defaultCenter={{ lat: 36.16, lng: -86.77 }}>
            {itinerary.map((item) => {
              if (item.location_coordinates) {
                return <Marker key={item.id} position={item.location_coordinates} title={item.location_name} />;
              }
              return null;
            })}
          </Map>
        </div>
      ) : null}
    </div>
  );
}
