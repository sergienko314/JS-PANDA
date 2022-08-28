import axios from 'axios';

export const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

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
    const response = await axios.get(`${BASE_URL}?`, options);
    return response;
  } catch (error) {
    console.error(error);
  }
}
