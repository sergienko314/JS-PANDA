import customSelect from 'custom-select';
import countriList from './countris.json';
import renderCountri from '../templates/SelectorCountri.hbs';

let selectCountri = document.querySelector('#searchCountries');

selectCountri.insertAdjacentHTML('afterbegin', renderCountri(countriList));
const mySelects = customSelect('select');

// let key = ;
// name = 'chooseQuery';
// console.log(key);
