'use client';

import { Form, Button } from 'react-bootstrap';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import { getLocations } from '@/api/locationData';
import { createTour, updateTour } from '@/api/tourData';

const initialState = {
  name: '',
  description: '',
  date: null,
  time: null,
  duration: '',
  price: '',
  imageUrl: '',
  location: '',
};

export default function TourForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [locations, setLocations] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getLocations(user.uid).then(setLocations);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInput);
    if (obj.firebaseKey) {
      const payload = { ...formInput, uid: user.uid };
      updateTour(payload).then(() => router.push(`/tours/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTour(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTour(patchPayload).then(() => {
          router.push('/tours');
        });
      });
    }

    router.push('/tours');
  };

  const handleDateChange = (value, fieldName) => {
    setFormInput((prevState) => ({
      ...prevState,
      [fieldName]: value || null,
    }));
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#000000', // black background
        paper: '#1a1a1a', // slightly lighter for elements like dropdowns
      },
      text: {
        primary: '#ffffff', // white text
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-row justify-center">
      <ThemeProvider theme={darkTheme}>
        <Form className="w-75 mt-3" onSubmit={handleSubmit}>
          {/* TOUR NAME INPUT */}
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Tour Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter tour name" value={formInput.name} onChange={handleChange} />
          </Form.Group>

          {/* TOUR DESCRIPTION INPUT */}
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Tour Description</Form.Label>
            <Form.Control name="description" type="text" placeholder="Enter description" value={formInput.description} onChange={handleChange} />
          </Form.Group>

          {/* TOUR DATE SELECTOR */}
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Tour Date</Form.Label>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker name="date" value={formInput.date} onChange={(value) => handleDateChange(value, 'date')} renderInput={(params) => <input {...params.inputProps} className="form-control" />} />
            </LocalizationProvider>
          </Form.Group>

          {/* TOUR TIME SELECTOR */}
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Tour Time</Form.Label>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker name="time" label="Select a time" value={formInput.time} onChange={(value) => handleDateChange(value, 'time')} renderInput={(params) => <input {...params.inputProps} className="form-control" />} />
            </LocalizationProvider>
          </Form.Group>

          {/* TOUR DURATION SELECTOR */}
          <Form.Group className="mb-3">
            <Form.Label>Select a Duration</Form.Label>
            <Form.Select name="duration" value={formInput.duration} onChange={handleChange}>
              <option>Select...</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>1 hour</option>
            </Form.Select>
          </Form.Group>

          {/* TOUR PRICE INPUT */}
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" type="text" placeholder="Enter a Price" value={formInput.price} onChange={handleChange} />
          </Form.Group>

          {/* TOUR IMAGE URL INPUT */}
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Image URL</Form.Label>
            <Form.Control name="imageUrl" type="text" placeholder="Enter a URL for the tour image" value={formInput.imageUrl} onChange={handleChange} />
          </Form.Group>

          {/* LOCATION SELECTOR */}
          <Form.Group className="mb-3">
            <Form.Label>Select a Location</Form.Label>
            <Form.Select name="location" value={formInput.location} onChange={handleChange}>
              <option value="">Select...</option>
              {locations.map((location) => (
                <option key={location.firebaseKey} value={location.firebaseKey}>
                  {location.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* SUBMIT BUTTON */}
          <div className="text-center">
            <Button variant="primary" type="submit" className="w-25 mt-2 mb-4">
              Submit
            </Button>
          </div>
        </Form>
      </ThemeProvider>
    </div>
  );
}

TourForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    time: PropTypes.instanceOf(Date),
    duration: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
