const pagination = document.querySelector('.pagination');

export function createPagination(total, page) {
  if (page >= 997) {
    page = 997;
  }

  /*-------------------------------------------------------------------------*/
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  let currentPage = page;

  if (total === 0) {
    liTag = '';
    pagination.innerHTML = liTag;
    return;
  }

  if (total === 1) {
    liTag = `<li class='first page active-page' data-id="1"> 1 </li>`;
    pagination.innerHTML = liTag;
    return;
  }

  if (page > 2) {
    //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class='first page ' data-id="1"> 1 </li>  `;
    if (page > 3) {
      //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li id="dots" class='dots' >... </li>`;
    }
  }
  // how many pages or li show before the current li
  if (page == total) {
    beforePage = beforePage - 2;
  } else if (page == total - 1) {
    beforePage = beforePage;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }
  if (page > 1) {
    currentPage--;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > total) {
      //if plength is greater than totalPage length then continue
      continue;
    }

    if (plength == 0) {
      //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = ' active-page';
    } else {
      //else leave empty to the active variable
      active = '';
    }
    if (currentPage < total) {
      liTag += `<li class='page${active} ' data-id="${currentPage}"> ${currentPage} </li>`;
    }

    currentPage++;
  }
  if (page < total - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < total - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li id="dots" class='dots'  >...</li>`;
    }
    liTag += `<li class='last page ' data-id="${total}"> ${total} </li>`;
  }
  if (page == total) {
    liTag += `<li class='last page active-page ' data-id="${total}"> ${total} </li>`;
  } else if (page === total - 1) {
    liTag += `<li class='last page ' data-id="${total}"> ${total} </li>`;
  }
  pagination.innerHTML = liTag;
}