import {
  fetchEvents,
  MakeListMarkup,
  fetchQueryEvents,
  eventSearchByName,
} from './js/getEventsApi';
import { onEventLiClick, makeModalMarkup } from './js/modal';
import debounce from 'lodash.debounce';
import './js/pagination';
//import './js/armymodal';
import './js/modal';
const searchBtn = document.querySelector('[name="startSearch"]');
searchBtn.addEventListener('input', debounce(eventSearchByName, 500));

fetchEvents().then(({ data }) => console.log(data));
fetchEvents().then(({ data }) => MakeListMarkup(data._embedded.events));

//=========================

// const eventLi = document.querySelector('.event-item');
// eventLi.addEventListener('click', onEventLiClick);

fetchEvents().then(({ data }) => makeModalMarkup(data._embedded.events[14]));
