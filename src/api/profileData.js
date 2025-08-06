const endpoint = 'https://swe-localtours-be.onrender.com/users';

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
        resolve(data);
      })
      .catch((error) => {
        console.error('Error creating user:', error); // Log any errors
        reject(error);
      });
  });

// GET USER by id. NOT CURRENTLY WORKING CORRECTLY-- just gets all users. need to fix on BE
const getSingleUser = (UserId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?uid=${UserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET ALL USERS TODO: delete this function once getSingleUser is fixed
const getUsers = () =>
  new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getUsers, createUser, getSingleUser };
