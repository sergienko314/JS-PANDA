import { fetchEvents, options } from './js/getEventsApi';
import { coutryCode } from './js/coutryCode';
import {
  MakeListMarkup,
  fetchQueryEvents,
  eventSearchByName,
} from './js/eventSearchByName';
import { onEventLiClick, makeModalMarkup } from './js/modal';

import './js/pagination';
//import './js/armymodal';
import './js/modal';

fetchEvents().then(res => MakeListMarkup(res.data._embedded.events));
