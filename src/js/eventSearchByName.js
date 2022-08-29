import axios from 'axios';
import { options, BASE_URL } from './getEventsApi';
import EventList from '../templates/EventListMarkup.hbs';
import debounce from 'lodash.debounce';
import { onEventLiClick } from './modal';
import { fetchEvents } from './getEventsApi';
import throttle from 'lodash.throttle';
import errorPanda from '../templates/errorPanda.hbs';
const list = document.querySelector('.js-eventList');

const selectPanel = document.querySelector('#search-form');

selectPanel.addEventListener('input', debounce(onSearchForm, 1000));
async function onSearchForm() {
  CountriKAY = selectPanel.elements.chooseQuery.value;
  serchValue = selectPanel[0].value;
  options.params.keyword = serchValue;
  options.params.countryCode = CountriKAY;
  if (options.params.countryCode === 'Choose country') {
    options.params.countryCode = '';
  }

  const res = await axios.get(`${BASE_URL}?`, options);
  try {
    list.innerHTML = '';
    MakeListMarkup(res.data._embedded.events);
    console.log(res.data._embedded.events);
  } catch (error) {
    return (list.innerHTML = errorPanda());
  }
}

export async function MakeListMarkup(data) {
  list.insertAdjacentHTML('beforeend', EventList(data));

  const li = document.querySelector('.event-list');
  await li.addEventListener('click', onEventLiClick);
}
