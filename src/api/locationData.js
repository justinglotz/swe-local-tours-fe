// const { clientCredentials } = require('@/utils/client');

const endpoint = 'http://localhost:8000/locations';

// GET ALL LOCATIONS BY UID
const getLocations = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?orderBy="uid"&equalTo="${uid}"`, {
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

// GET SINGLE LOCATION BY FIREBASE KEY
const getSingleLocation = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET A SINGLE LOCATIONS TOURS
// we may not need this, but putting it here in case we want to show the tours offered at a location in a location's details page
const getLocationTours = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tours.json?orderBy="location_id"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getLocations, getSingleLocation, getLocationTours };
