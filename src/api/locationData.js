// const { clientCredentials } = require('@/utils/client');

const endpoint = 'http://localhost:8000/locations';

// GET ALL LOCATIONS BY UID
const getLocations = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?uid=${uid}"`, {
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
    fetch(`${endpoint}/${LocationId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
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
        console.log('Server response:', data); // Log response data
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
    fetch(`${endpoint}${payload.id}`, {
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

// GET SINGLE LOCATION BY LOCATION ID
const getSingleLocation = (LocationId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations/${LocationId}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET SINGLE LOCATION BY PK
// above one is not working, so trying this way
const getSingleLocationByPK = (pk) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?orderBy="pk"&equalTo="${pk}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
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

// GET A SINGLE LOCATIONS TOURS TODO: move this to toursData.js
// we may not need this, but putting it here in case we want to show the tours offered at a location in a location's details page
const getLocationTours = (locationId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/${locationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getLocations, getSingleLocation, getLocationTours, getSingleLocationByPK, updateLocation, createLocation, deleteLocation };
