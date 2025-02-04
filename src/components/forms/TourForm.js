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
import dayjs from 'dayjs';

const initialState = {
  name: '',
  description: '',
  date: null,
  time: null,
  duration: '',
  price: '',
  image: '',
  location: '',
};

export default function TourForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(() => ({
    ...obj,
    date: obj.date ? dayjs(obj.date) : null,
    time: obj.time ? dayjs(`1970-01-01T${obj.time}`).toDate() : null,
  }));

  const [locations, setLocations] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getLocations(user.uid).then(setLocations);

    if (obj.id) {
      setFormInput((prev) => ({
        ...obj,
        date: obj.date ? dayjs(obj.date) : prev.date,
        time: obj.time ? dayjs(obj.time) : prev.time,
      }));
    }
  }, [obj, user]);

  const handleSubmit = (e) => {
    console.log('Form Submitted.');
    e.preventDefault();
    const payload = {
      ...formInput,
      date: formInput.date ? formInput.date.format('YYYY-MM-DD') : null,
      time: formInput.time ? formInput.time.format('HH:mm:ss') : null,
      uid: user.uid,
    };

    console.log(payload);

    if (obj.id) {
      updateTour(payload).then(() => router.push('/tours'));
    } else {
      createTour(payload).then(() => router.push('/tours'));
      // const { id } = response;
      // const patchPayload = { id };
      // console.log(patchPayload);
      // updateTour(patchPayload).then(() => {
      //   router.push('/tours');
      // });
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#000000',
        paper: '#1a1a1a',
      },
      text: {
        primary: '#ffffff',
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
              <DatePicker value={formInput.date} onChange={(value) => setFormInput((prev) => ({ ...prev, date: value }))} slotProps={{ textField: { size: 'small' } }} />
            </LocalizationProvider>
          </Form.Group>

          {/* TOUR TIME SELECTOR */}
          <Form.Group className="mb-3" controlId="formBasicTime">
            <Form.Label>Tour Time</Form.Label>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker value={formInput.time} onChange={(value) => setFormInput((prev) => ({ ...prev, time: value }))} slotProps={{ textField: { size: 'small' } }} />
            </LocalizationProvider>
          </Form.Group>

          {/* TOUR DURATION SELECTOR */}
          <Form.Group className="mb-3">
            <Form.Label>Select a Duration</Form.Label>
            <Form.Select name="duration" value={formInput.duration} onChange={handleChange}>
              <option>Select...</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
            </Form.Select>
          </Form.Group>

          {/* TOUR PRICE INPUT */}
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" type="text" placeholder="Enter a Price" value={formInput.price} onChange={handleChange} />
          </Form.Group>

          {/* TOUR IMAGE URL INPUT */}
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control name="image" type="text" placeholder="Enter a URL for the tour image" value={formInput.image} onChange={handleChange} />
          </Form.Group>

          {/* LOCATION SELECTOR */}
          <Form.Group className="mb-3">
            <Form.Label>Select a Location</Form.Label>
            <Form.Select name="location" value={formInput.location} onChange={handleChange}>
              <option value="">Select...</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
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
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    duration: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
    location: PropTypes.number,
    user_id: PropTypes.number,
    id: PropTypes.string,
  }),
};
