// import customSelect from 'custom-select';

// customSelect('select');

// const cstSel = customSelect('select')[0]; // return is an array of instances!
// console.log(cstSel.open);
let select = function () {
  let selectItem = document.querySelectorAll('.select__item');
  let selectHeader = document.querySelectorAll('.select__header');

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle);
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }
  function selectChoose() {
    let text = this.innerText;

    let select = this.closest('.select');
    let currentText = select.querySelector('.select__current');
    currentText.innerText = text;

    select.classList.remove('is-active');
    console.dir();
  }
};
select();
