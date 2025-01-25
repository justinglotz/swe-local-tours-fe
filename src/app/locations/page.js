'use client';

import LocationCard from '@/components/LocationCard';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getLocations } from '@/api/locationData';

export default function LocationsPage() {
  // TODO: Set a state for locations
  const [locations, setLocations] = useState([]);

  // get user ID using UseAuth Hook
  const { user } = useAuth();

  // TODO: Fetch locations from the API and set the state
  const getAllTheLocations = () => {
    getLocations(user.uid).then((data) => {
      console.log(data);
      setLocations(data);
    });
  };

  // TODO: useEffect to fetch locations when the page loads
  useEffect(() => {
    getAllTheLocations();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/location/new" passHref>
        <Button>Add A Location</Button>
      </Link>

      {/* For now just displaying one location card to make sure it works. will delete later */}

      <div className="d-flex flex-wrap">
        {/* map over locations here using LocationCard component */}
        {locations.map((location) => (
          <LocationCard key={location.id} locationObj={location} />
        ))}
      </div>
    </div>
  );
}
