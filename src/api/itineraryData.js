// API CALLS FOR ITINERARY ITEMS
const endpoint = 'https://swe-localtours-be.onrender.com/itineraries';

// GET ALL ITINERARIES
const getItineraries = () =>
  new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET ITINERARIES BY UID
const getItinerariesByUid = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?uid=${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET COMPLETED ITINERARIES BY UID
const getCompletedItinerariesByUid = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?uid=${uid}&completed=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET A SINGLE ITINERARY BY ID
const getSingleItinerary = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE AN ITINERARY
const createItinerary = (payload) =>
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

// UPDATE AN ITINERARY
const updateItinerary = (payload) =>
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

// DELETE AN ITINERARY
const deleteItinerary = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET COMPLETED ITINERARIES
const getCompletedItineraries = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?completed=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getItineraries, getItinerariesByUid, getSingleItinerary, createItinerary, updateItinerary, deleteItinerary, getCompletedItineraries, getCompletedItinerariesByUid };
