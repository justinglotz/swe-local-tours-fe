import { getSingleLocation, deleteLocation } from './locationData';
import { deleteTour, getLocationTours } from './tourData';

const viewLocationDetails = (LocationId) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleLocation(LocationId), getLocationTours(LocationId)])
      .then(([locationObject, locationToursArray]) => {
        console.log('locationObject:', locationObject);
        console.log('locationToursArray:', locationToursArray);
        resolve({ ...locationObject, tours: locationToursArray });
      })
      .catch((error) => reject(error));
  });

const deleteLocationTours = (LocationId) =>
  new Promise((resolve, reject) => {
    getLocationTours(LocationId)
      .then((toursArray) => {
        console.warn(toursArray, 'Location Tours');
        const deleteTourPromises = toursArray.map((tour) => deleteTour(tour.id));

        Promise.all(deleteTourPromises).then(() => {
          deleteLocation(LocationId).then(resolve);
        });
      })
      .catch((error) => reject(error));
  });

export default { viewLocationDetails, deleteLocationTours };
