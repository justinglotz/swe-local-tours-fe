/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import ProfileForm from '@/components/forms/ProfileForm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getSingleUser } from '@/api/profileData';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import { useAuth } from '@/utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  // define userObj in state. it is updated by ProfileForm
  const [userObj, setUserObj] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    uid: '',
  }); // set initial state to user object with empty strings

  // useEffect to get user object from the database, the dependecy array should be userObj (from useState), so it runs the effect when userObj changes. the callback function should be:
  useEffect(() => {
    if (user) {
      // if user is defined
      getSingleUser(user.uid)
        .then((data) => {
          setUserObj(data);
          console.log('userObj:', userObj);
          // if user object bio is not an empty string, route to tours page
          if (data?.bio !== '') {
            router.push('/tours');
          }
        })
        .catch((error) => {
          console.error('Error getting user:', error);
        });
    }
  }, [user]);

  // if userObj is available and bio is not empty, redirect to tours page
  if (userObj?.bio !== '') {
    // TODO: Make sure this works once getSingleUser is fixed
    return (
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <p>Redirecting...</p>
      </div>
    );
  }

  // if userObj is available and bio is empty, display the ProfileForm component
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}!</h1>
      <ProfileForm />
    </div>
  );
}

export default Home;
