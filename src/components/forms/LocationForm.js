'use client';

import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/authContext';
import PropTypes from 'prop-types';
import { createLocation, updateLocation } from '@/api/locationData';
import geocodeAddress from '@/utils/geocodeAddress';
import { Autocomplete } from '@react-google-maps/api';

const initialState = {
  id: '',
  name: '',
  address: '',
};

export default function LocationForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [autocomplete, setAutocomplete] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (obj.id) {
        await updateLocation(formInput);
      } else {
        const coords = await geocodeAddress(formInput.address);
        const payload = { ...formInput, uid: user.uid, coordinates: coords };
        await createLocation(payload);
      }
      router.push('/locations');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLoad = (autoCompleteInstance) => {
    setAutocomplete(autoCompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setFormInput((prevState) => ({
          ...prevState,
          address: place.formatted_address,
        }));
      }
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <Form className="w-75 mt-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Location Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter location name" value={formInput.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Location Address</Form.Label>
          <div className="relative">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Form.Control type="text" placeholder="Enter address" value={formInput.address} onChange={(e) => handleChange({ target: { name: 'address', value: e.target.value } })} />
            </Autocomplete>
            {!autocomplete && <div className="absolute top-0 right-2 text-sm text-gray-500 mt-2">Loading places...</div>}
          </div>
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
