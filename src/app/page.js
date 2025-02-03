'use client';

import ProfileForm from '@/components/forms/ProfileForm';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import { useAuth } from '@/utils/context/authContext';

function Home() {
  const { user } = useAuth();

  // define userObj in state. it is updated by ProfileForm

  // useEffect to get user object from the database, the dependecy array should be userObj (from useState), so it runs the effect when userObj changes. the callback function should be:

  // if user object bio is not an empty string, route to tours page

  // else, display the ProfileForm component. (ProfileForm Component will the user object to the database when the form is submitted.)

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
      <h1>Hello {user.displayName}! </h1>
      <ProfileForm />
    </div>
  );
}

export default Home;
