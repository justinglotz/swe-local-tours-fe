'use client';

import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/authContext';
import PropTypes from 'prop-types';
import { createLocation, updateLocation } from '@/api/locationData';

const initialState = {
  name: '',
  description: '',
  address: '',
};

export default function LocationForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.LocationId) {
      const payload = { ...formInput, uid: user.uid };
      updateLocation(payload).then(() => router.push(`/locations/${obj.LocationId}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createLocation(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateLocation(patchPayload).then(() => {
          router.push('/locations');
        });
      });
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

  return (
    <div className="flex flex-row justify-center">
      <Form className="w-75 mt-3" onSubmit={handleSubmit}>
        {/* LOCATION NAME INPUT */}
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Location Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter location name" value={formInput.name} onChange={handleChange} />
        </Form.Group>

        {/* LOCATION DESCRIPTION INPUT */}
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Location Description</Form.Label>
          <Form.Control name="description" type="text" placeholder="Enter location description" value={formInput.description} onChange={handleChange} />
        </Form.Group>

        {/* LOCATION ADDRESS INPUT */}
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Location Address</Form.Label>
          <Form.Control name="address" type="text" placeholder="Enter location address" value={formInput.address} onChange={handleChange} />
        </Form.Group>

        {/* SUBMIT BUTTON */}
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
    name: PropTypes.string,
    description: PropTypes.string,
    address: PropTypes.string,
  }),
};
