'use client';

import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function TourForm() {
  return (
    <div className="flex flex-row justify-center">
      <Form className="w-75 mt-3">
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Tour Name</Form.Label>
          <Form.Control type="text" placeholder="Enter tour name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Tour Description</Form.Label>
          <Form.Control type="text" placeholder="Enter description" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Tour Date</Form.Label>
          <Form.Control type="text" placeholder="Select a Date" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Tour Time</Form.Label>
          <Form.Control type="text" placeholder="Select a Time" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select a Duration</Form.Label>
          <Form.Select>
            <option>Select...</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>45 minutes</option>
            <option>1 hour</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder="Enter a Price" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" placeholder="Enter a URL for the Tour image" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select a Location</Form.Label>
          <Form.Select>
            <option>Select...</option>
          </Form.Select>
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
