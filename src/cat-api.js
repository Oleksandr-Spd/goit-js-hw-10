import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_KxoNyGGa97HPNKRKWfhHqGLGPUUZI87fOtvv6yZgvegADpuYR52pNHSxc0VfQD3Z';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get('/breeds').then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_id=${breedId}`)
    .then(response => response.data);
}
