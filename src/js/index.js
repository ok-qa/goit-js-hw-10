import SlimSelect from 'slim-select';


import { fetchBreeds, fetchCatByBreed } from './cat-api';
import '../css/index.css';
import Notiflix from 'notiflix';
import { createMarkup } from './markup.js';

const loader = document.querySelector('.loader');
const selectBreed = document.querySelector('.breed-select');
const errorMsg = document.querySelector('.error');
const backdrop = document.querySelector('#backdrop');
const catModal = document.querySelector('#cat-card-content');
const closeButton = document.querySelector('#close-button');

let pickedBred = null;
let breeds = [];
let SlimSelect = new SlimSelect({
  select: '.breed-select',
  placeholder: 'Loading breeds...',
  allowDeselect: true,
  deselectLabel: '<span class="placeholder">Select a breed</span>',
  showFirstOption: false,
  onChange: info => {
    let selectedBreed = info[0].value;
    if (selectedBreed) {
      fetchCatByBreed(selectedBreed);
    }
  },
});

errorMsg.style.display = 'none';
backdrop.style.display = 'none';

closeButton.addEventListener('click', () => {
  backdrop.style.display = 'none';
});

function createBreedMarkup(items) {
  SlimSelect.setData(
    [{ text: 'Select a breed', value: '' }].concat(
      items.map(item => {
        return { text: item.name, value: item.id };
      })
    )
  );
}