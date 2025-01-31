// use the TourForm component here

'use client';

import React, { useEffect, useState } from 'react';
import { getSingleTour } from '@/api/tourData';
import TourForm from '@/components/forms/TourForm';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function EditTour({ params }) {
  const [editItem, setEditItem] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleTour(id).then((data) => {
      // Parse the date and time using dayjs
      const parsedData = {
        ...data,
        date: data.date ? dayjs(data.date) : null,
        time: data.time ? dayjs(`1970-01-01T${data.time}`).toDate() : null,
      };
      setEditItem(parsedData);
    });
  }, [id]);

  return <TourForm obj={editItem} />;
}

EditTour.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
