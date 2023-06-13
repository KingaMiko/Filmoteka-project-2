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
      <li class="member__card">
        <div class="member__thumb">        
            <img class="member__image" width='120' 
            src="${member.photo}"
            alt=${member.name}
            loading="lazy"
            />      
        </div>
        <div class="member__info">
          <p class="member__name">${member.name}</p>
          <a class="member__link member__link-git" 
             href="${member.github}" 
             target="_blank">github</a>
             <a class="member__link" 
          href="${member.linkedin}" 
          target="_blank">linkedin</a>
          <p class="member__role">${member.role ?? ''}</p>
        </div>
      </li>`;
    })
    .join('');

  refs.modalRef.innerHTML = '';
  refs.teamRef.innerHTML = markup;
 
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