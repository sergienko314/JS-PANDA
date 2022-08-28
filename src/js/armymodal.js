const PROMPT_DELAY = 3000;
const MAX_PROMPT_ATTEMPTS = 3;
let promptCounter = 0;

const modalBg = document.querySelector('.modal__bg');
const closeBtn = document.querySelector('.close__btn');

function showAnnoyModal(display) {
  modalBg.style.display = display;
}


function openModalAnnoy() {
  if (promptCounter === MAX_PROMPT_ATTEMPTS) {
    return;
  }
    setTimeout(() => {
    promptCounter += 1;
    showAnnoyModal('block');
  }, PROMPT_DELAY);
}

closeBtn.addEventListener('click', function() {
  showAnnoyModal('none');
  openModalAnnoy();
});


window.addEventListener('click', function(event) {
  if (event.target === modalBg) {
    showAnnoyModal('none');
  }
});

openModalAnnoy();
