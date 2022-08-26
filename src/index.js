import { fetchEvents, MakeListMarkup } from './js/getEventsApi';

fetchEvents().then(({ data }) => console.log(data._embedded.events));

fetchEvents().then(({ data }) => MakeListMarkup(data._embedded.events));
