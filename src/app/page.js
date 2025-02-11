'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/authContext';
import { getSingleUser } from '@/api/profileData';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getSingleUser(user.uid).then((data) => {
        if (data && data[0] && data[0].first_name && data[0].last_name && data[0].bio) {
          router.push('/tours');
        } else {
          router.push('/profile/new');
        }
      });
    }
  }, [user, router]);

  return null; // or a loading spinner
}
