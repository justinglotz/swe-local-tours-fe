// const { clientCredentials } = require('@/utils/client');

const endpoint = 'http://localhost:8000';

// GET ALL LOCATIONS BY UID
const getLocations = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations?orderBy="uid"&equalTo="${uid}"`, {
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
    fetch(`${endpoint}/locations?orderBy="pk"&equalTo="${pk}"`, {
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

// GET A SINGLE LOCATIONS TOURS
// we may not need this, but putting it here in case we want to show the tours offered at a location in a location's details page
const getLocationTours = (LocationId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/tours.json?orderBy="location_id"&equalTo="${LocationId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getLocations, getSingleLocation, getLocationTours, getSingleLocationByPK };
