import { teamList } from './team';

const refs = {
  footerLink: document.querySelector('.footer__authors'),
  modalRef: document.querySelector('.modal__wrap'),
  teamRef: document.querySelector('.team__wrap'),
  closeModalButton: document.querySelector('.modal__btn-close') // Dodany element przycisku z klasą "close-modal"
};

refs.footerLink.addEventListener('click', onOpenModal);

function loadIntoTeamModal(list) {
  const markup = list
    .map(member => {
      return `
      <li class="team-footer__card">
      <img class="team-footer__foto" 
      src="${member.photo}"
      alt=${member.name}
      loading="lazy">
      <div class="about-footer">
      <p class="footer-text__big">${member.name}</p>
      <p class="footer-text__small">${member.role ?? ''}</p>
      <ul class="networks-footer list">
      <li class="networks-footer__list">
      <a class="networks-footer__link" 
          href="${member.github}" 
          target="_blank"> 
          <svg class="networks-footer__icon>
          <use href="./images/svg/icons.svg#heart"></use>
        </svg>
      </a>
      <a class="networks-footer__link" 
          href="${member.linkedin}" 
          target="_blank">  
        <svg class="networks-footer__icon">
          <use href="./images/svg/icons#icon-git-icon"></use>
        </svg></a>
      </li>
      </ul>
      </div>`;
    })
    .join('');

  refs.modalRef.innerHTML = '';
  refs.teamRef.innerHTML = markup;
<<<<<<< HEAD
  refs.closeModalButton.addEventListener('click', onCloseModal);
=======
 
>>>>>>> b0928eb972cec7f7808b82c0c8ec7f60ddf85b46
}

function onOpenModal(e) {
  document.body.classList.add('show-modal');
  window.addEventListener('keydown', onEscKeyPress);
  refs.closeModalButton.addEventListener('click', onCloseModal);
  loadIntoTeamModal(teamList);

  document.addEventListener('click', onOutsideClick);
}

function onOutsideClick(e) {
  if (!e.target.closest('.modal') && !e.target.classList.contains('footer__authors')) {
    onCloseModal();
  }
}

function onCloseModal() {
  document.body.classList.remove('show-modal');
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(e) {
  if (e.key === 'Escape') {
    onCloseModal();
  }
}