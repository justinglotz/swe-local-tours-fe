'use client';

import TourCard from '@/components/TourCard';
import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function ToursPage() {
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
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
      </div>
    </>
  );
}
