/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import TourCard from '@/components/TourCard';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getTours } from '@/api/tourData';
import { useAuth } from '@/utils/context/authContext';

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const { user } = useAuth();

  const getAllTheTours = () => {
    getTours(user.uid).then(setTours);
  };

  useEffect(() => {
    getAllTheTours();
  }, []);

  return (
    <>
      <div className="text-center mt-3">
        <Link href="/tour/new" passHref>
          <Button className="w-25">
            <FontAwesomeIcon icon={faPlus} /> New Tour
          </Button>
        </Link>
      </div>
      <div className="flex flex-row justify-center flex-wrap">
        {tours.map((tour) => (
          <TourCard key={tour.firebaseKey} tourObj={tour} onUpdate={getAllTheTours} />
        ))}
      </div>
    </>
  );
}
