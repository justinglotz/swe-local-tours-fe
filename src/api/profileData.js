const endpoint = 'http://localhost:8000/users';

// CREATE USER
const createUser = (payload) =>
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
        console.error('Error creating user:', error); // Log any errors
        reject(error);
      });
  });

// GET USER by id
const getSingleUser = (UserId) =>
  new Promise((resolve, reject) => {
    fetch(
      `${endpoint}/${UserId}`,
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

export { createUser, getSingleUser };
