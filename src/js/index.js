import SlimSelect from 'slim-select';
new SlimSelect({
  select: '#selectElement',
});

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import '../css/index.css';
import { createMarkup } from './markups';

const loader = document.querySelector('.loader');
const selectBreed = document.querySelector('.breed-select');
const errorMsg = document.querySelector('.error');
const backdrop = document.querySelector('#backdrop');
const catModal = document.querySelector('#cat-card-content');
const closeButton = document.querySelector('#close-button');

let pickedBred = null;
let breeds = [];

