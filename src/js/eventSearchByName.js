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

country.addEventListener('change', onChangeCountryCode);

async function onChangeCountryCode() {
  try {
    if (country.value !== '') {
      options.params.countryCode = country.value;
    }
    let countryValue = country.value;
    console.log(countryValue);
    options.params.countryCode = `${countryValue}`;

    const response = await axios.get(`${BASE_URL}?`, options);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

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

export async function MakeListMarkup(data) {
  list.insertAdjacentHTML('beforeend', EventList(data));

  const li = document.querySelector('.event-list');
  await li.addEventListener('click', onEventLiClick);
}