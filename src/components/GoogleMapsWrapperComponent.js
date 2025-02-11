'use client';

import { LoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const libraries = ['places'];

export default function GoogleMapsWrapper({ children }) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      {children}
    </LoadScript>
  );
}

GoogleMapsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
