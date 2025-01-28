// use the TourForm component here

'use client';

import React, { useEffect, useState } from 'react';
import { getSingleTour } from '@/api/tourData';
import TourForm from '@/components/forms/TourForm';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function EditTour({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleTour(firebaseKey).then((data) => {
      // Parse the date and time using dayjs
      const parsedData = {
        ...data,
        date: data.date ? dayjs(data.date) : null,
        time: data.time ? dayjs(data.time) : null,
      };
      setEditItem(parsedData);
    });
  }, [firebaseKey]);

  return <TourForm obj={editItem} />;
}

EditTour.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
