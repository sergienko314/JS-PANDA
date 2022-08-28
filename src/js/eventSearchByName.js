import axios from 'axios';
import { options, BASE_URL } from './getEventsApi';
import EventList from '../templates/EventListMarkup.hbs';
import debounce from 'lodash.debounce';
import onEventLiClick from './modal';

const list = document.querySelector('.js-eventList');
const searchBtn = document.querySelector('[name="startSearch"]');
const country = document.querySelector('[name="сhoose-country"]');

searchBtn.addEventListener('input', debounce(eventSearchByName, 500));

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
}
