import axios from 'axios';
import { options, BASE_URL } from './getEventsApi';
import EventList from '../templates/EventListMarkup.hbs';
import debounce from 'lodash.debounce';
import { onEventLiClick } from './modal';
import { fetchEvents } from './getEventsApi';
import throttle from 'lodash.throttle';

const list = document.querySelector('.js-eventList');
// const searchBtn = document.querySelector('[name="startSearch"]');
// searchBtn.addEventListener('input', debounce(eventSearchByName, 500));

const selectPanel = document.querySelector('#search-form');
// 1234124234123523452345234562346

selectPanel.addEventListener('input', debounce(onSearchForm, 1000));
async function onSearchForm() {
  CountriKAY = selectPanel.elements.chooseQuery.value;
  serchValue = selectPanel[0].value;
  options.params.keyword = serchValue;
  options.params.countryCode = CountriKAY;
  // console.log(options.params.countryCode);
  if (options.params.countryCode === 'Choose country') {
    options.params.countryCode = '';
  }

  const res = await axios.get(`${BASE_URL}?`, options);
  list.innerHTML = '';
  MakeListMarkup(res.data._embedded.events);
}

// werwertwertewrtwetrywerytwerwergwetrywetrywety
// async function onChangeCountryCode() {
//   try {
//     if (country.value !== '') {
//       options.params.countryCode = country.value;
//     }
//     let countryValue = country.value;
//     options.params.countryCode = `${countryValue}`;

//     const response = await axios.get(`${BASE_URL}?`, options);
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function fetchQueryEvents() {
//   const q = searchBtn.value;
//   try {
//     if (country.value !== '') {
//       options.params.countryCode = country.value;
//     }
//     options.params.keyword = `${q}`;
//     const response = await axios.get(`${BASE_URL}?`, options);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function eventSearchByName() {
//   list.innerHTML = '';

//   fetchQueryEvents().then(res => {
//     if (res.data.page.totalElements === 0) {
//       list.innerHTML = `<p class="no-event">Sorry, no one event find!</p>`;
//       searchBtn.value = '';
//     }
//     MakeListMarkup(res.data._embedded.events);
//     searchBtn.value = '';
//   });
// }

export async function MakeListMarkup(data) {
  list.insertAdjacentHTML('beforeend', EventList(data));

  const li = document.querySelector('.event-list');
  await li.addEventListener('click', onEventLiClick);
}
