'use client';

import ProfileForm from '@/components/forms/ProfileForm';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/authContext';
import { getSingleUser } from '@/api/profileData';

export default function CreateProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [showProfileForm, setShowProfileForm] = useState(false);

  useEffect(() => {
    if (user) {
      getSingleUser(user.uid).then((data) => {
        // if user has a profile, redirect to tours page
        if (data && data[0] && data[0].first_name && data[0].last_name && data[0].bio) {
          router.push('/tours');
        } else {
          // if user does not have a profile, show the profile form
          setShowProfileForm(true);
        }
      });
    }
  }, [user, router]);

  return (
    <div>
      {/* Show the profile form if showProfileForm is true */}
      {showProfileForm && <ProfileForm />}
    </div>
  );
}
