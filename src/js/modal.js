import { options, BASE_URL } from './getEventsApi';
import { fetchEvents } from './getEventsApi';
import { MakeListMarkup, pages, searchEvents } from './eventSearchByName';
import axios from 'axios';
import EventItemMarkup from '../templates/EventItemMarkup.hbs';
import './eventSearchByName';
//====================== MODAL
const selectPanel = document.querySelector('#search-form'); //DLM

const modalDiv = document.querySelector('.modal__markup');
const backdrop = document.querySelector('.backdrop');
const list = document.querySelector('.js-eventList');
const modal = document.querySelector('.modal');

export async function onEventLiClick(e) {
  e.preventDefault();
  const ul = e.target.closest('ul');
  if (e.target !== ul) {
    backdrop.classList.remove('is-hidden');
    modal.classList.add('bounce-in-top');
    document.body.style.overflow = 'hidden';
    const eventId = e.target.parentNode.parentNode.id;
    options.params.id = eventId;
    const res = await fetchEventsById();
    makeModalMarkup(res);
  } else {
    return;
  }
}

export function makeModalMarkup(data) {
  modalDiv.innerHTML = '';
  modalDiv.insertAdjacentHTML('beforeend', EventItemMarkup(data));
  const authorBtn = document.querySelector('.modal__btn--more');
  authorBtn.addEventListener('click', onAuthorClick);
}

export async function onAuthorClick(e) {
  e.preventDefault();
  list.innerHTML = '';
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
  options.params.id = '';
  const who = document.querySelector('.js-who').textContent;
  options.params.keyword = who;
  selectPanel[0].value = who; ///DLM
  try {
    const res = await axios.get(`${BASE_URL}.json?`, options);
    //DLM>>
    pages.params.currentPage = 1;
    pages.params.recurcycall = 0;
    if (res.data.page.totalElements >= 994) {
      pages.params.totalPage = Math.ceil(994 / 20);
    } else {
      pages.params.totalPage = Math.ceil(res.data.page.totalElements / 20);
    }
    //DLM<<

    MakeListMarkup(res.data._embedded.events);
  } catch (error) {
    pages.params.currentPage = 1; //DLM
    searchEvents(); //DLM
    console.error(error);
  }
}

export async function fetchEventsById() {
  try {
    const response = await axios.get(
      `${BASE_URL}/${options.params.id}?`,
      options
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

//===================
const btnClose = document.querySelector('.modal__btn--close');

btnClose.addEventListener('click', e => {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
  options.params.id = '';
  modal.classList.remove('bounce-in-top');
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    backdrop.classList.add('is-hidden');
    document.body.style.overflow = 'visible';
    options.params.id = '';
    modal.classList.remove('bounce-in-top');
  }
});

document.addEventListener('click', function (e) {
  if (e.target === backdrop) {
    backdrop.classList.add('is-hidden');
    document.body.style.overflow = 'visible';
    options.params.id = '';
    modal.classList.remove('bounce-in-top');
  }
});
