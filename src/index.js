import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

// const catSelector = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

let catSelector = new SlimSelect({
  select: '#breed-select',
  
  settings: {
    alwaysOpen: false,
    placeholderText: 'Looking for your cat?',
    allowDeselect: true,
  },
  events: {
    afterChange: newVal => {
      console.log(newVal);
      getCat(newVal[0].value);
    },
  },
});

error.setAttribute('hidden', true);
// catSelector.setAttribute('hidden', true);
// catSelector.close();

function generateCatInfo(data) {
  catInfo.removeAttribute('hidden');
  // catSelector.removeAttribute('hidden');
  let catInformation = data[0].breeds[0];
  const { name, temperament, description } = catInformation;
  catInfo.innerHTML = data
    .map(({ url }) => `<img src="${url}" alt="${name}" width="400" />`)
    .join('');
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<h2>${name}</h2>
    <h4>${temperament}</h4>
    <h3>${description}</h3>
    `
  );
}

fetchBreeds()
  .then(data => {
    console.log(data);
    fetchCatByBreed(data[0].id).then(breedData => {
      generateCatInfo(breedData);
      //catSelector.removeAttribute('hidden');
      const selectorData = data.map(({ id, name }) => {
        return { value: id, text: name };
      });
      catSelector.setData(selectorData);
      // catSelector.innerHTML = data
      //   .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      //   .join('');
    });
  })
  .catch(err => console.log(err))
  .finally(() => loader.setAttribute('hidden', true));

// catSelector.addEventListener('change', getCat);

function getCat(value) {
  catInfo.setAttribute('hidden', true);
  loader.removeAttribute('hidden');
  fetchCatByBreed(value)
    .then(data => {
      generateCatInfo(data);
    })
    .catch(() => {
      catInfo.setAttribute('hidden', true);
      return Notiflix.Notify.failure(error.textContent);
    })
    .finally(() => loader.setAttribute('hidden', true));
}

// const array = arrayA.map(({ name }) => {
//   return {};
// });
//let name = {firstName: 'Nina', lastName: 'Lee' };
