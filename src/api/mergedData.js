import { getLocationTours, getSingleLocationByPK } from './locationData';

// below is a little different from our wireframe because it gives us access to the tours at the location. keeping for now in case we might want to show the tours offered at a location in a location's details page
const viewLocationDetails = (LocationId) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleLocationByPK(LocationId), getLocationTours(LocationId)])
      .then(([locationObject, locationToursArray]) => {
        resolve({ ...locationObject.fields, tours: locationToursArray });
      })
      .catch((error) => reject(error));
  });

// const viewLocationDetails = (LocationId) =>
//   new Promise((resolve, reject) => {
//     Promise.all([getSingleLocation(LocationId), getLocationTours(LocationId)])
//       .then(([locationObject, locationToursArray]) => {
//         resolve({ ...locationObject.fields, tours: locationToursArray });
//       })
//       .catch((error) => reject(error));
//   });

export default viewLocationDetails;
