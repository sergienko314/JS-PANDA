import { options, BASE_URL } from './getEventsApi';
import axios from 'axios';
import EventItemMarkup from '../templates/EventItemMarkup.hbs';
//====================== MODAL

const modalDiv = document.querySelector('.modal__markup');
const backdrop = document.querySelector('.backdrop');

export async function onEventLiClick(e) {
  e.preventDefault();
  backdrop.classList.remove('is-hidden');
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
  backdrop.classList.toggle('is-hidden');
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    backdrop.classList.add('is-hidden');
    modalDiv.innerHTML = '';
  }
});
