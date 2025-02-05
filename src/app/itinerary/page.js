// loop thru to display each on ItineraryTourCard component

'use client';

import ItineraryTourCard from '@/components/ItineraryTourCard';
import React, { useEffect, useState } from 'react';
import userData from '@/utils/sample-data/users.json';
import itineraryData from '@/utils/sample-data/itinerary.json';
import geocodeAddress from '@/utils/geocodeAddress';
import { Map, Marker } from '@vis.gl/react-google-maps';

// gmaps variable to turn on and off Google Maps features
const gmaps = false;

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState([]);

  const getTheItinerary = () => {
    setItinerary(itineraryData);
  };

  useEffect(() => {
    getTheItinerary();
    if (gmaps) {
      const fetchCoordinates = async () => {
        const coords = await Promise.all(
          itinerary.map(async (item) => {
            const coord = await geocodeAddress(item.location_address);
            return { ...item, coord };
          }),
        );
        setItinerary(coords);
      };

      fetchCoordinates();
    }
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
