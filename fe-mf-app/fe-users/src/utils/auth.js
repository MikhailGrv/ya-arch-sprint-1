const BASE_URL = '/api/auth';
const BASE_URL_users = '/api/users';

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const checkToken = (token) => {
  console.log('checkToken jwt',token);

  return fetch(`${BASE_URL_users}/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getResponse)
}