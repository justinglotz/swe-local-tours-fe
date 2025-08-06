// API CALLS FOR TOURS

// const endpoint = clientCredentials.databaseURL;
const endpoint = 'https://swe-localtours-be.onrender.com/tours';

// GET ALL TOURS FOR A SPECIFIC USER
const getTours = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?uid=${uid}`, {
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

// DELETE TOUR
const deleteTour = (TourId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/${TourId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET SINGLE TOUR
const getSingleTour = (TourId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/${TourId}`, {
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
    fetch(endpoint, {
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
    fetch(`${endpoint}/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET A SINGLE LOCATIONS TOURS
const getLocationTours = (locationId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?location=${locationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getTours, createTour, deleteTour, getSingleTour, updateTour, getLocationTours };
