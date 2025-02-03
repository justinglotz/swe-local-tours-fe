'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import PropTypes from 'prop-types';
import ClientProvider from '@/utils/context/ClientProvider';

export default function Providers({ children }) {
  return (
    <ClientProvider>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>{children}</APIProvider>
    </ClientProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
