import EventItemMarkup from '../templates/EventItemMarkup.hbs';
const modalDiv = document.querySelector('.modal__markup');

const backdrop = document.querySelector('.backdrop');

export function onEventLiClick() {
  backdrop.classList.remove('is-hidden');
}

export function makeModalMarkup(data) {
  modalDiv.insertAdjacentHTML('beforeend', EventItemMarkup(data));
}

const btnClose = document.querySelector('.modal__btn--close');

btnClose.addEventListener('click', e => {
  backdrop.classList.toggle('is-hidden');
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    backdrop.classList.add('is-hidden');
  }
});
