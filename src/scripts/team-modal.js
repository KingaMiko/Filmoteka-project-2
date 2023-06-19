import { teamList } from './team';

const refs = {
  footerLink: document.querySelector('.footer__authors'),
  modalRef: document.querySelector('.modal__wrap'),
  teamRef: document.querySelector('.team__wrap'),
  closeModalButton: document.querySelector('.modal__btn-close'),
};

refs.footerLink.addEventListener('click', onOpenModal);

function loadIntoTeamModal(list) {
  const markup = list
    .map(member => {
      return `
    <li class="team">
      <img class="team__foto" 
      src="${member.photo}"
      alt=${member.name}
      loading="lazy">
    <div class="team__about">
      <p class="team__text--big">${member.name}</p>
      <p class="team__text--small">${member.role ?? ''}</p>
      <ul class="team__socials">
        <li class="team__socials--icon-placeholder">
          <a class="team__socials--link" 
          href="${member.github}" 
          target="_blank"> 
            <svg class="team__socials--icon" aria-hidden="true" height="24" width="24" version="1.1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </li>
        <li class="team__socials--icon-placeholder">
          <a class="team__socials--link" 
          href="${member.linkedin}" 
          target="_blank"> 
            <svg class="team__socials--icon" aria-hidden="true" height="24" width="24" version="1.1" viewBox="0 0 32 32"><path fill-rule="evenodd" d="M12 12h5.535v2.837h.079c.77-1.381 2.655-2.837 5.464-2.837C28.92 12 30 15.637 30 20.367V30h-5.769v-8.54c0-2.037-.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509V30H12V12zM2 12h6v18H2V12zM8 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
            </svg>
          </a>
        </li>
    </ul>
  </div>`;
    })
    .join('');

  refs.modalRef.innerHTML = '';
  refs.teamRef.innerHTML = markup;
  refs.closeModalButton.addEventListener('click', onCloseModal);
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
