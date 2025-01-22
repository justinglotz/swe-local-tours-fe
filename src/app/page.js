'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';

function Home() {
  const { user } = useAuth();

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
      <p>here we can use the ProfileForm to have user enter their name and description which will update their profile page. Upon submitting that, we have useRouter redirect to tours page. Add conditional so that if they click home and already have profile data (or whatever that determines they have already filled out ProfileForm), the home page automatically routes to display tours page.If not, it displays Profile form.</p>
    </div>
  );
}

export default Home;
