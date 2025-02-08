// export default function getCoordinates(address) {
//   const geocoder = new google.maps.Geocoder();

//   return new Promise((resolve, reject) => {
//     geocoder.geocode({ 'address': address }, (results, status) => {
//       if (status === 'OK') {
//         const latitude = results[0].geometry.location.lat();
//         const longitude = results[0].geometry.location.lng();
//         resolve({ latitude, longitude });
//       } else {
//         reject(new Error(`Geocoding failed: ${status}`));
//       }
//     });
//   });
// }

const geocodeAddress = async (address) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);

    const data = await response.json();

    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      return [lat, lng];
    }
    console.error('Geocoding error:', data.status);
    return null;
  } catch (err) {
    console.error('Failed to geocode address:', err);
    return null;
  }
};

export default geocodeAddress;
