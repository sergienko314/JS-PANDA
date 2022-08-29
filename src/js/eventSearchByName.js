import axios from 'axios';
import { options, BASE_URL } from './getEventsApi';
import EventList from '../templates/EventListMarkup.hbs';

import debounce from 'lodash.debounce';
import { onEventLiClick } from './modal';
import { fetchEvents } from './getEventsApi';

const list = document.querySelector('.js-eventList');
const searchBtn = document.querySelector('[name="startSearch"]');
const country = document.querySelector('[name="сhoose-country"]');

searchBtn.addEventListener('input', debounce(eventSearchByName, 500));
country.addEventListener('change', countryCode => {
  countryCode = country.value;
  options.countryCode = countryCode;
  fetchEventsasync(options);
});

export async function fetchQueryEvents() {
  const q = searchBtn.value;
  try {
    if (country.value !== '') {
      options.params.countryCode = country.value;
    }
    options.params.keyword = `${q}`;
    const response = await axios.get(`${BASE_URL}?`, options);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export function eventSearchByName() {
  list.innerHTML = '';

  fetchQueryEvents().then(res => {
    if (res.data.page.totalElements === 0) {
      list.innerHTML = `<p class="no-event">Sorry, no one event find!</p>`;
      searchBtn.value = '';
    }
    MakeListMarkup(res.data._embedded.events);
    searchBtn.value = '';
  });
}

export function MakeListMarkup(data) {
  list.insertAdjacentHTML('beforeend', EventList(data));
  const li = document.querySelector('.event-list');
  li.addEventListener('click', onEventLiClick);
}

// //====================== MODAL

// const modalDiv = document.querySelector('.modal__markup');
// const backdrop = document.querySelector('.backdrop');

// export async function onEventLiClick(e) {
//   e.preventDefault();
//   backdrop.classList.remove('is-hidden');
//   const eventId = e.target.parentNode.parentNode.id;
//   options.params.id = eventId;
//   const res = await fetchEventsById();
//   makeModalMarkup(res);
//   console.log(res);
// }

// export function makeModalMarkup(data) {
//   modalDiv.innerHTML = '';
//   modalDiv.insertAdjacentHTML('beforeend', EventItemMarkup(data));
// }

// export async function fetchEventsById() {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/${options.params.id}?`,
//       options
//     );
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }
