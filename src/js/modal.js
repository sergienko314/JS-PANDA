import EventItemMarkup from '../templates/EventItemMarkup.hbs';
const modalDiv = document.querySelector('.modal__markup');

const backdrop = document.querySelector('.backdrop');

export function onEventLiClick() {
  backdrop.classList.remove('is-hidden');
}

export function makeModalMarkup(data) {
  modalDiv.insertAdjacentHTML('beforeend', EventItemMarkup(data));
}
