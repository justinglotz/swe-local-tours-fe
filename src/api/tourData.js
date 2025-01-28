import { clientCredentials } from '@/utils/client';
// API CALLS FOR TOURS

const endpoint = clientCredentials.databaseURL;
// const endpoint = 'http://localhost:8000';

// GET ALL TOURS FOR A SPECIFIC USER
const getTours = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tours.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// DELETE BOOK
const deleteTour = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tours/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET SINGLE TOUR
const getSingleTour = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tours/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE TOUR
const createTour = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tours.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE TOUR
const updateTour = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tours/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getTours, createTour, deleteTour, getSingleTour, updateTour };
