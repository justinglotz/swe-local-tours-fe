'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/function-component-definition */

import { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getSingleUser } from '@/api/profileData';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { getCompletedItinerariesByUid } from '@/api/itineraryData';
import CompletedItineraryTourCard from '@/components/CompletedItineraryTourCard';

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [completedItineraries, setCompletedItineraries] = useState([]);

  const getTheSingleUser = () => {
    getSingleUser(user.uid).then((data) => {
      if (data[0] && data[0].first_name && data[0].last_name && data[0].bio) {
        setUserData(data[0]);
      } else {
        setShowModal(true);
      }
    });
  };

  const fetchCompletedItineraries = () => {
    getCompletedItinerariesByUid(user.uid).then((data) => {
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
          <div className="shadow-lg" style={{ maxWidth: '600px', margin: 'auto', padding: '30px', borderRadius: '15px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9fafb', textAlign: 'center', marginTop: '60px' }}>
            <div>
              <img src={user.photoURL} alt="Profile" style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #007bff', color: '#000', padding: '5px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
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
        <h3 style={{ color: '#fff', display: 'inline-block', paddingBottom: '8px', fontSize: '20px', fontWeight: '600', textDecoration: 'underline', marginTop: '50px' }}>Completed Tours</h3>
        <div>
          <Carousel>
            {completedItineraries.map((completedObj) => (
              <Carousel.Item key={completedObj.id} interval={5000}>
                <CompletedItineraryTourCard completedObj={completedObj} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </ProtectedRoute>
  );
}
