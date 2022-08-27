import axios from 'axios';
import EventList from '../templates/EventListMarkup.hbs';
import EventItem from '../templates/EventItemMarkup.hbs';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const list = document.querySelector('.js-eventList');
const searchBtn = document.querySelector('[name="startSearch"]');

export let options = {
  params: {
    apikey: 'F5kU07sI57mWLEvDMarIrvffHyAVdkdU',
    page: 1,
    size: 16,
    countryCode: '',
    keyword: '',
  },
};

export async function fetchEvents() {
  try {
    const response = await axios.get(
      `${BASE_URL}?apikey=${options.params.apikey}`,
      options
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export function MakeListMarkup(data) {
  list.insertAdjacentHTML('beforeend', EventList(data));
}

//export function MakeItemMarkup(data) {
//  ***.insertAdjacentHTML('beforeend', EventItem(data))
//}

export async function fetchQueryEvents() {
  const q = searchBtn.value;
  try {
    options.params.keyword = `${q}`;
    const response = await axios.get(
      `${BASE_URL}?apikey=${options.params.apikey}`,
      options
    );

    return response;
  } catch {
    console.error(error);
  }
}

export function eventSearchByName() {
  list.innerHTML = '';
  fetchQueryEvents().then(res => {
    if (res.data.page.totalElements === 0) {
      alert('No any EVENTS');
    }
    MakeListMarkup(res.data._embedded.events);
  });
}
