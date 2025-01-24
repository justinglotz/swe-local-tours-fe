import { getSingleLocation, getLocationTours } from './locationData';

// below is a little different from our wireframe because it gives us access to the tours at the location. keeping for now in case we might want to show the tours offered at a location in a location's details page
const viewLocationDetails = (locationFirebaseKey) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleLocation(locationFirebaseKey), getLocationTours(locationFirebaseKey)])
      .then(([locationObject, locationBooksArray]) => {
        resolve({ ...locationObject, tours: locationBooksArray });
      })
      .catch((error) => reject(error));
  });

export default viewLocationDetails;
