import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/authContext';
import { createUser } from '@/api/profileData';
import { Form, Button } from 'react-bootstrap';

export default function ProfileForm() {
  const [formInput, setFormInput] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    uid: '',
  });
  const router = useRouter();
  const { user } = useAuth();
  console.log('uid:', user.uid);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };
    console.log('payload:', payload);
    // create user object in the database
    createUser(payload).then(() => {
      // route to tours page
      router.push(`/tours`);
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <Form onSubmit={handleSubmit} className="w-75 mt-3">
        {/* First name input */}
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" name="first_name" value={formInput.first_name} placeholder="Enter First Name" onChange={handleChange} required />
        </Form.Group>

        {/* Last name input */}
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" name="last_name" value={formInput.last_name} placeholder="Enter Last Name" onChange={handleChange} required />
        </Form.Group>

        {/* Bio input */}
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Bio:</Form.Label>
          <Form.Control type="text" name="bio" value={formInput.bio} placeholder="Enter Bio" onChange={handleChange} required />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
