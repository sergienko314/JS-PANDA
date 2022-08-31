import  './js/preloader'

import { fetchEvents, options } from './js/getEventsApi';
import {
  MakeListMarkup,
  fetchQueryEvents,
  eventSearchByName,
} from './js/eventSearchByName';
import { onEventLiClick, makeModalMarkup } from './js/modal';

import './js/pagination';
import './js/modal';
import './js/armymodal';
fetchEvents().then(res => MakeListMarkup(res.data._embedded.events));
