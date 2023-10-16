import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const catCard = document.querySelector('.cat-info');

const error = {
  message: 'Ooops! Something went wrong! Try reloading the page!',
  timeout: 3000,
};

breedSelect.addEventListener('change', onSelect);
window.addEventListener('load', onLoadFetchBreeds);

function createSlimSelect(breedSelect) {
  const select = new SlimSelect({
    select: breedSelect,
    settings: {
      placeholderText: 'Select the breed of cat 🐈',
    },
  });
}

function onLoadFetchBreeds() {
  fetchBreeds()
    .then(data => {
      Notiflix.Loading.circle();

      breedSelect.innerHTML = optionsMarkup(data);

      createSlimSelect(breedSelect);
    })
    .catch(() => error)
    .finally(() => Notiflix.Loading.remove());
}

function optionsMarkup(arr) {
  return arr.map(({ name, id }) => {
    return `<option value="${id}">${name}</option>`;
  });
}

function onSelect(event) {
  catCard.innerHTML = '';
  Notiflix.Loading.circle();

  const id = event.target.value;

  fetchCatByBreed(id)
    .then(data => {
      showContent('block');

      const image = data[0].url;
      const breedName = data[0].breeds[0].name;
      const description = data[0].breeds[0].description;
      const temperament = data[0].breeds[0].temperament;

      const catInfoHTML = `
<img src="${image}" alt="${breedName}">
          <div class="cat-info-wrap">
            <h2 class="cat-info-title">${breedName}</h2>
            <p class="cat-info-descr">${description}</p>
            <p class="cat-info-temper"><strong>Темперамент:</strong> ${temperament}</p>
          </div>
      `;

      catCard.innerHTML = catInfoHTML;
    })
    .catch(error => {
      console.error('Fetch error:', error);
      error;
    })
    .finally(() => {
      Notiflix.Loading.remove();
    });
}

function showContent(display) {
  breedSelect.style.display = display;
}

function repaintMarkup(place, markup) {
  breedSelect.insertAdjacentHTML(place, markup);
}
