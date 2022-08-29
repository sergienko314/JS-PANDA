import customSelect from 'custom-select';
import countriList from './countris.json';
import renderCountri from '../templates/SelectorCountri.hbs';

let selectCountri = document.querySelector('#searchCountries');
let customSelect = document.querySelector('.custom-select-option');

customSelect.addEventListener('change', () => console.log(customSelect.value));

selectCountri.insertAdjacentHTML('afterbegin', renderCountri(countriList));
const mySelects = customSelect('select');
