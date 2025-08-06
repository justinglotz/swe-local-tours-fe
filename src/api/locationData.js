// const { clientCredentials } = require('@/utils/client');

const endpoint = 'https://swe-localtours-be.onrender.com/locations';

// GET ALL LOCATIONS BY UID
const getLocations = (uid) =>
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

// DELETE LOCATION
const deleteLocation = (LocationId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/${LocationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE LOCATION
const createLocation = (payload) =>
  new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error('Error creating location:', error); // Log any errors
        reject(error);
      });
  });

// UPDATE LOCATION
const updateLocation = (payload) =>
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

// GET SINGLE LOCATION BY LOCATION ID
const getSingleLocation = (LocationId) =>
  new Promise((resolve, reject) => {
    fetch(
      `${endpoint}/${LocationId}`,
      { cache: 'no-store' },
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET SINGLE LOCATION BY ID
// not using this now
const getSingleLocationById = (id) =>
  new Promise((resolve, reject) => {
    fetch(
      `${endpoint}?orderBy="id"&equalTo="${id}"`,
      { cache: 'no-store' },
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // Assuming you're expecting the response to be an array with one location
          const location = Object.values(data)[0]; // Get the first location from the response
          resolve(location);
        } else {
          resolve(null); // No location found
        }
      })
      .catch(reject);
  });

export { getLocations, getSingleLocation, getSingleLocationById, updateLocation, createLocation, deleteLocation };
