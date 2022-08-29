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
//DLM>>
import { createPagination } from './pagination.js';

const pagination = document.querySelector('.pagination');

let currentPage = 1;
let totalPage = '';
let recurcycall = 0;
let searchBox = '';
//DLM<<

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
  //DLM>> Визнаяення загальної кількості сторінок і виклик пагінації.
  currentPage = 1;
  if (res.data.page.totalElements >= 994) {
    totalPage = Math.ceil(994 / 20);
  } else {
    totalPage = Math.ceil(res.data.page.totalElements / 20);
  }
  createPagination(totalPage, currentPage);
  //DLM<<
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

  //DLM>> Виклик пагінації
  if (currentPage === 1) {
    if (recurcycall === 0) {
      searchEvents();
    }
  }
  createPagination(totalPage, currentPage);
  //DLM<<
}

console.log('12');
console.log('12');
console.log('12');

//DLM>>
//Визначення поточної сторінки
function setCurrentPage(e) {
  currentPage = Number(e.target.innerHTML);
  const pageId = e.target.dataset.id;
  if (pageId !== undefined) {
    console.log(`pageId: ${pageId}`);
    searchEvents();
    createPagination(totalPage, currentPage);
  }
}

//Пошук івенту за ключовим словом для підключення пагінації.
const searchEvents = async () => {
  recurcycall++;
  try {
    console.log('countryCode ' + selectPanel.elements.chooseQuery.value);
    if (selectPanel.elements.chooseQuery.value.length <= 2) {
      options.params.countryCode = selectPanel.elements.chooseQuery.value;
    }
    options.params.keyword = selectPanel[0].value;
    options.params.page = currentPage - 1;
    const events = await fetchEvents();
    if (events.data.page.totalElements >= 994) {
      totalPage = Math.ceil(994 / 20);
    } else {
      totalPage = Math.ceil(events.data.page.totalElements / 20);
    }
    if (totalPage != 0) {
      console.log(events.data._embedded.events);
      list.innerHTML = '';
      MakeListMarkup(events.data._embedded.events);
    }
  } catch (error) {
    console.log(error.message);
    console.log('Something WRONG!?!');
  }
};
pagination.addEventListener('click', setCurrentPage); //
//DLM<<
