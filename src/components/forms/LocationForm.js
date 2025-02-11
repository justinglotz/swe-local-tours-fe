'use client';

import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/authContext';
import PropTypes from 'prop-types';
import { createLocation, updateLocation } from '@/api/locationData';
import geocodeAddress from '@/utils/geocodeAddress';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';

// https://www.youtube.com/watch?v=HlsubLyXMMw&ab_channel=Mitter-YourTechMate

const gmaps = true;

const initialState = {
  id: '',
  name: '',
  // description: '',
  address: '',
};

const libraries = ['places'];

export default function LocationForm({ obj = initialState }) {
  const inputRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [formInput, setFormInput] = useState(obj);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      // if obj.id exists, set the form input to the obj
      setFormInput(obj);
    }
  }, [obj]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (obj.id) {
      updateLocation(formInput).then(() => router.push(`/locations`));
    } else {
      const coords = await geocodeAddress(formInput.address);
      const payload = { ...formInput, uid: user.uid, coordinates: coords };
      await createLocation(payload);
      router.push('/locations');
    }

    router.push('/locations');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnPlacesChanged = () => {
    const address = inputRef.current.getPlaces()[0].formatted_address;
    setFormInput((prevState) => ({
      ...prevState,
      address,
    }));
  };

  return (
    <div className="flex flex-row justify-center">
      <Form className="w-75 mt-3" onSubmit={handleSubmit}>
        {/* LOCATION NAME INPUT */}
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Location Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter location name" value={formInput.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Location Address</Form.Label>
          {gmaps && isLoaded ? (
            <StandaloneSearchBox
              // eslint-disable-next-line
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handleOnPlacesChanged}
            >
              <input type="text" placeholder="Enter address" className="form-control" />
            </StandaloneSearchBox>
          ) : (
            <Form.Control name="address" type="text" placeholder="Enter address" value={formInput.address} onChange={handleChange} />
          )}
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="w-25 mt-2 mb-4">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

LocationForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
  }),
};
