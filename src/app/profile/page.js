'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getSingleUser } from '@/api/profileData';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Modal, Button, Carousel, Image } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { getCompletedItineraries } from '@/api/itineraryData';

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [completedItineraries, setCompletedItineraries] = useState([]);

  const getTheSingleUser = () => {
    getSingleUser(user.uid).then((data) => {
      console.log('Fetched User Data:', data);
      if (data[0] && data[0].first_name && data[0].last_name && data[0].bio) {
        setUserData(data[0]);
      } else {
        setShowModal(true);
      }
    });
  };

  const fetchCompletedItineraries = () => {
    getCompletedItineraries().then((data) => {
      setCompletedItineraries(data);
    });
  };

  useEffect(() => {
    getTheSingleUser();
    fetchCompletedItineraries();
  }, []);

  const handleRedirect = () => {
    setShowModal(false);
    router.push('/profile/new');
  };

  return (
    <ProtectedRoute>
      {showModal ? (
        <Modal show={showModal} onHide={handleRedirect} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa', color: '#000' }}>
            <Modal.Title>Profile Incomplete</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#f8f9fa', color: '#000' }}>Please fill out the profile form first.</Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#f8f9fa', color: '#000' }}>
            <Button variant="primary" onClick={handleRedirect}>
              Go to Profile Form
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        userData && (
          <div style={{ maxWidth: '600px', margin: 'auto', padding: '30px', borderRadius: '15px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9fafb', textAlign: 'center' }}>
            <div>
              <img src={user.photoURL} alt="Profile" style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #007bff', padding: '5px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
              <h2 style={{ marginTop: '15px', color: '#333', fontSize: '24px', fontWeight: '600' }}>
                {userData.first_name} {userData.last_name}
              </h2>
              <p style={{ fontSize: '16px', color: '#777', fontStyle: 'italic', marginTop: '8px' }}>{userData.bio}</p>
              <p style={{ fontWeight: '600', color: '#007bff', fontSize: '16px', marginTop: '10px' }}>Email: {user.email}</p>
            </div>
          </div>
        )
      )}

      <div style={{ padding: '20px', marginTop: '30px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
        <h3 style={{ color: '#fff', borderBottom: '2px solid #007bff', display: 'inline-block', paddingBottom: '8px', fontSize: '20px', fontWeight: '600' }}>Completed Tours</h3>
        <p style={{ color: '#ddd', fontSize: '16px', fontStyle: 'italic', marginTop: '5px' }}>(Coming soon)</p>
        <div>
          <Carousel>
            {console.log(completedItineraries)};
            <Carousel.Item interval={5000}>
              <Image text="First slide" />
              <h2>1</h2>
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <h2>2</h2>
              <Image text="Second slide" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image text="Third slide" />
              <h2>3</h2>
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </ProtectedRoute>
  );
}
