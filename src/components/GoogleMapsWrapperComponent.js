'use client';

import { LoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import Loading from './Loading';

const libraries = ['places'];

export default function GoogleMapsWrapper({ children }) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries} loadingElement={<Loading />}>
      {children}
    </LoadScript>
  );
}

GoogleMapsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
