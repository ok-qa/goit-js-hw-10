import axios from 'axios';

const API_KEY =
  'live_67J7AXh0WW6IIKoUOflgQrQRznlzC75dDbyp1CZSH7NWSHGINTir8OcKkYSJqSez';

const catApi = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  headers: {
    'x-api-key': API_KEY,
  },
});

export function fetchBreedsBreeds() {
  return catApi.get(`breeds`).then(response => {
    return response.data;
  });
}
export function fetchCatByBreedCatByBreed(breedId) {
  return catApi
    .get(`images/search`, {
      params: {
        breed_ids: breedId,
      },
    })
    .then(response => {
      return response.data;
    });
}