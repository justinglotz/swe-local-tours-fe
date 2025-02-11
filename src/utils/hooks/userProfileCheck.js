import { useAuth } from '@/utils/context/authContext';
import { useState, useEffect } from 'react';
import { getSingleUser } from '@/api/profileData';

export default function UserProfileCheck() {
  const { user } = useAuth();
  const [isProfileComplete, setIsProfileComplete] = useState(null); // Initially null to prevent unnecessary modal flash

  useEffect(() => {
    if (user) {
      getSingleUser(user.uid).then((data) => {
        if (data?.[0]?.first_name && data?.[0]?.last_name && data?.[0]?.bio) {
          setIsProfileComplete(true); // If user data is available, set isProfileComplete to true
        } else {
          setIsProfileComplete(false); // If user data is not available, set isProfileComplete to false
        }
      });
    }
  }, [user]); // Run this effect when user changes

  return isProfileComplete;
}
