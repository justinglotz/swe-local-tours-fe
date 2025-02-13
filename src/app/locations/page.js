/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import LocationCard from '@/components/LocationCard';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';
import { Button } from '@mui/material';
import { getLocations } from '@/api/locationData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function LocationsPage() {
  // Set a state for locations
  const [locations, setLocations] = useState([]);

  // get user ID using UseAuth Hook
  const { user } = useAuth();

  // Fetch locations from the API and set the state
  const getAllTheLocations = () => {
    getLocations(user.uid).then((data) => {
      setLocations(data);
    });
  };

  // useEffect to fetch locations when the page loads
  useEffect(() => {
    console.log('Fetching locations for user:', user?.uid); // Check if user ID is available and used
    getAllTheLocations();
  }, []);

  return (
    <ProtectedRoute>
      <div className="text-center my-4">
        <div className="text-center mt-3">
          <Link href="/location/new" passHref>
            <Button className="w-25" sx={{ borderRadius: '20px' }} style={{ backgroundColor: 'var(--secondary-color)', color: '#FFFFFF' }} variant="contained">
              <FontAwesomeIcon icon={faPlus} /> &nbsp;New Location
            </Button>
          </Link>
        </div>

        <div className="flex flex-row justify-center flex-wrap">
          {/* map over locations here using LocationCard component */}
          {locations.map((location) => (
            <LocationCard key={location.id} locationObj={location} onUpdate={getAllTheLocations} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
