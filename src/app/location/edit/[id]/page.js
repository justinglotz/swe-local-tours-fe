'use client';

import React, { useState, useEffect } from 'react';
import LocationForm from '@/components/forms/LocationForm';
import { getSingleLocationByPK } from '@/api/locationData';
import PropTypes from 'prop-types';

export default function EditLocation({ params }) {
  const { id } = params;
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getSingleLocationByPK(id).then(
      (data) => {
        setEditItem(data);
      },
      [id],
    );
  });
  return <LocationForm obj={editItem} />;
}

EditLocation.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
