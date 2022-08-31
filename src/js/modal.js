import { options, BASE_URL } from './getEventsApi';
import axios from 'axios';
import EventItemMarkup from '../templates/EventItemMarkup.hbs';
//====================== MODAL

const modalDiv = document.querySelector('.modal__markup');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');

export async function onEventLiClick(e) {
  e.preventDefault();
  backdrop.classList.remove('is-hidden');
  modal.classList.add('bounce-in-top');
  document.body.style.overflow = 'hidden';
  const eventId = e.target.parentNode.parentNode.id;
  options.params.id = eventId;
  const res = await fetchEventsById();
  makeModalMarkup(res);
  console.log(res);
}

export function makeModalMarkup(data) {
  modalDiv.innerHTML = '';
  modalDiv.insertAdjacentHTML('beforeend', EventItemMarkup(data));
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
  modal.classList.remove('bounce-in-top');
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    backdrop.classList.add('is-hidden');
    document.body.style.overflow = 'visible';
    modal.classList.remove('bounce-in-top');
  }
});

document.addEventListener('click', function (e) {
  if (e.target === backdrop) {
    backdrop.classList.add('is-hidden');
    document.body.style.overflow = 'visible';
    modal.classList.remove('bounce-in-top');
  }
});
