import {
  fetchEvents,
  MakeListMarkup,
  fetchQueryEvents,
  eventSearchByName,
} from './js/getEventsApi';
import debounce from 'lodash.debounce';
import './js/pagination'
import './js/armymodal'
const searchBtn = document.querySelector('[name="startSearch"]');

//fetchEvents().then(({ data }) => console.log(data));

fetchEvents().then(({ data }) => MakeListMarkup(data._embedded.events));

searchBtn.addEventListener('input', debounce(eventSearchByName, 500));


