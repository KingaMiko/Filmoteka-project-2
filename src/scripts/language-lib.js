window.addEventListener('DOMContentLoaded', function () {
  const allLang = ['en', 'pl'];
  const html = document.querySelector('html');
  const headerItem = document.querySelectorAll('.header__controls-item');

  const langArr = {
    headerTitle: {
      en: 'Filmoteka',
      pl: 'Filmoteka',
    },
    headerLink: {
      en: 'HOME',
      pl: 'START',
    },
    headerLibrary: {
      en: 'MY LIBRARY',
      pl: 'BIBLIOTEKA',
    },
    headerLibraryBtn: {
      en: 'watched',
      pl: 'obejrzane',
    },
    headerLibraryBtnque: {
      en: 'queue',
      pl: 'kolejka',
    },
    placaholder: {
      en: 'Movie search',
      pl: 'Wyszukaj film',
    },
    footeritem: {
      en: '©  2023 | All Rights Reserved | ',
      pl: '©  2023 | Wszelkie prawa zastrzezone | ',
    },

    filmvote: {
      en: 'Vote / Votes',
      pl: 'Głosów',
    },
    filmpop: {
      en: 'Popularity',
      pl: 'Popularność',
    },
    filmtitle: {
      en: 'Original Title',
      pl: 'Oryginalny tytuł',
    },
    filmg: {
      en: 'Genre',
      pl: 'Gatunek filmu',
    },
    filmabout: {
      en: 'About',
      pl: 'Opis',
    },
    butff: {
      en: 'Add to watched',
      pl: 'Dodano do obejrzanych',
    },
    butfc: {
      en: 'Add to queue',
      pl: 'Dodano do kolejki',
    },
    footer: {
      en: 'Developed with',
      pl: 'Zaprojektowano przez',
    },
    choose: {
      en: 'Choose genre',
      pl: 'Wybierz gatunek',
    },
  };
  const langButtons = document.querySelectorAll('.translate');
  langButtons.forEach(button => {
    button.addEventListener('click', changeLanguageOnClick);
  });
  if (langButtons.length > 0) {
    langButtons.forEach(button => {
      button.addEventListener('click', changeLanguageOnClick);
    });
  }

  function changeLanguageOnClick(event) {
    const selectedLanguage = event.target.getAttribute('data-lang');
    let lang = event.target.getAttribute('data-lang');
    location.href = window.location.pathname + '#' + lang;
    let currentLanguage = localStorage.getItem('language');

    if (selectedLanguage !== currentLanguage) {
      localStorage.setItem('language', selectedLanguage);
      location.reload();
    }
  }

  function changeLanguage() {
    let hash = localStorage.getItem('language');
    html.setAttribute('lang', hash);
    document.querySelector('.header__controls-item').textContent = langArr['headerLink'][hash];
    headerItem[1].textContent = langArr['headerLibrary'][hash];
    document.querySelector('.footer__text').textContent = langArr['footeritem'][hash];

    document.querySelector('.dev').textContent = langArr['footer'][hash];
  }

  let valueLn = localStorage.getItem('language');
  if (!allLang.includes(valueLn)) {
    valueLn = 'en';
  }
  localStorage.setItem('language', valueLn);
  changeLanguage();
});
