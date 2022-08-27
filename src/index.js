import {
  fetchEvents,
  MakeListMarkup,
  fetchQueryEvents,
  eventSearchByName,
} from './js/getEventsApi';
import debounce from 'lodash.debounce';

const searchBtn = document.querySelector('[name="startSearch"]');

fetchEvents().then(({ data }) => console.log(data._embedded.events));

fetchEvents().then(({ data }) => MakeListMarkup(data._embedded.events));

searchBtn.addEventListener('input', debounce(eventSearchByName, 500));
