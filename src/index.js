import { fetchEvents, options } from './js/getEventsApi';
import {
  MakeListMarkup,
  fetchQueryEvents,
  eventSearchByName,
} from './js/eventSearchByName';
import { onEventLiClick, makeModalMarkup } from './js/modal';

import './js/pagination';
//import './js/armymodal';
import './js/modal';

// eventLi.addEventListener('click', onEventLiClick);

//fetchEvents().then(({ data }) => makeModalMarkup(data._embedded.events[14]));
