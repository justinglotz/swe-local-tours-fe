// loop thru to display each on ItineraryTourCard component

'use client';

import ItineraryTourCard from '@/components/ItineraryTourCard';
import React, { useEffect, useState } from 'react';
import userData from '@/utils/sample-data/users.json';
import itineraryData from '@/utils/sample-data/itinerary.json';

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState([]);

  const getTheItinerary = () => {
    setItinerary(itineraryData);
  };

  useEffect(() => {
    getTheItinerary();
  }, []);

  console.log(itinerary);

  return (
    <div>
      <h1 className="text-center m-4">
        {userData.first_name} {userData.last_name}&apos;s Itinerary
      </h1>
      {itinerary.map((item) => (
        <ItineraryTourCard key={item.id} itineraryObj={item} onUpdate={getTheItinerary} />
      ))}
      {/* <div className="h-3/4">
        {tour.coordinates && ( // Only render map when coordinates exist
          <Map
            defaultZoom={15} // Increased zoom level for better visibility
            defaultCenter={tour.coordinates}
          >
            <Marker position={tour.coordinates} title={tour.locationName} />
          </Map>
        )}
      </div> */}
    </div>
  );
}
