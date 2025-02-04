// API CALLS FOR ITINERARY ITEMS
const endpoint = 'http://localhost:8000/itinerary';

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

export default createItinerary;
