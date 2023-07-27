import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';


const catSelector = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');


error.setAttribute('hidden', true)
catSelector.setAttribute('hidden', true);


fetchBreeds()
    .then(data => {
        catSelector.removeAttribute('hidden');
    return (catSelector.innerHTML = data
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join(''));
    })
    .catch(err => console.log(err))
    .finally(() => loader.setAttribute('hidden', true))

catSelector.addEventListener('change', changeCat);


function changeCat(event) {
  catInfo.setAttribute('hidden', true);
  loader.removeAttribute('hidden')
  fetchCatByBreed(event.target.value)
    .then(data => {
      catInfo.removeAttribute('hidden');
      catSelector.removeAttribute('hidden');
      let catInformation = data[0].breeds[0];
      const { name, description, temperament } = catInformation;
      catInfo.innerHTML = data
        .map(({ url }) => `<img src="${url}" alt="${name}" width="400" />`)
        .join('');
      catInfo.insertAdjacentHTML(
        'beforeend',
        `<h2>${name}</h2>
    <h3>${description}</h3>
    <h4>${temperament}</h4>`
      );
    })
    .catch(() => {
      catInfo.setAttribute('hidden', true);
      return Notiflix.Notify.failure(error.textContent)
    })
    .finally(() => loader.setAttribute('hidden', true))
}