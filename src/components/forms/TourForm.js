'use client';

import { Form, Button } from 'react-bootstrap';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

export default function TourForm() {
  const [tourName, setTourName] = useState('');
  const [tourDescription, setTourDescription] = useState('');
  const [tourDate, setTourDate] = useState(null);
  const [tourTime, setTourTime] = useState(null);
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      tourName,
      tourDescription,
      tourDate: tourDate ? tourDate.format('YYYY-MM-DD') : null,
      tourTime: tourTime ? tourTime.format('HH:mm') : null,
      duration,
      price,
      imageUrl,
      location,
    };
    console.log(payload);
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
  return (
    <div className="flex flex-row justify-center">
      <ThemeProvider theme={darkTheme}>
        <Form className="w-75 mt-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Tour Name</Form.Label>
            <Form.Control type="text" placeholder="Enter tour name" value={tourName} onChange={(e) => setTourName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Tour Description</Form.Label>
            <Form.Control type="text" placeholder="Enter description" value={tourDescription} onChange={(e) => setTourDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Tour Date</Form.Label>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={tourDate} onChange={(newValue) => setTourDate(newValue)} renderInput={(params) => <input {...params.inputProps} className="form-control" />} />
            </LocalizationProvider>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Tour Time</Form.Label>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="Select a time" value={tourTime} onChange={(newValue) => setTourTime(newValue)} renderInput={(params) => <input {...params.inputProps} className="form-control" />} />
            </LocalizationProvider>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select a Duration</Form.Label>
            <Form.Select value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option>Select...</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>1 hour</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="Enter a Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="Enter a URL for the tour image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select a Location</Form.Label>
            <Form.Select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option>Select...</option>
            </Form.Select>
          </Form.Group>
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
