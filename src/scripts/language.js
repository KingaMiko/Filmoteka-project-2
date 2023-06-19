const allLang = ['en', 'pl'];
const html = document.querySelector('html');
const input = document.querySelector('.header__search-form-input');
const headerItem = document.querySelectorAll('.header__controls-item');
const buttonLibrary = document.querySelectorAll('.header-library-buttons__button');
const list = document.querySelectorAll('option');
const firstValueList = [...list];
const newList = [...list];
newList.splice(0, 3);
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
    en: '©  2023 | All Rights Reserved |',
    pl: '©  2022 | Wszelkie prawa zastrzezone |',
  },
  footeritems: {
    en: 'Developed',
    pl: 'Stworzone',
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
  filab: {
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
    en: 'Developed',
    pl: 'Zaprojektowano',
  },
  footercont: {
    en: 'CONTACT US',
    pl: 'Skontaktuj się z nami',
  },

  choose: {
    en: 'Choose genre',
    pl: 'Wybierz gatunek',
  },

  team: {
    en: 'Developed',
    pl: 'Zaprojektowano',
  },
};
const genrelist = {
  Action: {
    en: 'Action',
    pl: 'Akcja',
  },
  Adventure: {
    en: 'Adventure',
    pl: 'Przygoda',
  },
  Animation: {
    en: 'Animation',
    pl: 'Animacja',
  },
  Comedy: {
    en: 'Comedy',
    pl: 'Komedia',
  },
  Crime: {
    en: 'Crime',
    pl: 'Kryminał',
  },
  Documentary: {
    en: 'Documentary',
    pl: 'Dokument',
  },
  Drama: {
    en: 'Drama',
    pl: 'Dramat',
  },
  Family: {
    en: 'Family',
    pl: 'Familijny',
  },
  Fantasy: {
    en: 'Fantasy',
    pl: 'Fantastyka',
  },
  History: {
    en: 'History',
    pl: 'Historyczny',
  },
  Horror: {
    en: 'Horror',
    pl: 'Horror',
  },
  Music: {
    en: 'Music',
    pl: 'Muzyka',
  },
  Mystery: {
    en: 'Mystery',
    pl: 'Tajemnica',
  },
  Romance: {
    en: 'Romance',
    pl: 'Romans',
  },
  'Science Fiction': {
    en: 'Science Fiction',
    pl: 'Fantastyka naukowa',
  },
  'TV Movie': {
    en: 'TV Movie',
    pl: 'Film TV',
  },
  Thriller: {
    en: 'TV Movie',
    pl: '',
  },
  War: {
    en: 'War',
    pl: 'Wojenny',
  },
  Western: {
    en: 'Western',
    pl: 'Western',
  },
};

const select = document.querySelector('select');

select.addEventListener('change', changeURLLanguage);
function changeURLLanguage() {
  let lang = select.value;
  location.href = window.location.pathname + '#' + lang;
  localStorage.setItem('language', lang);
  location.reload();
}

const langButtons = document.querySelectorAll('.translate');
langButtons.forEach(button => {
  button.addEventListener('click', changeLanguageOnClick);
});

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

  select.value = hash;
  html.setAttribute('lang', hash);
  document.querySelector('.header__controls-item').textContent = langArr['headerLink'][hash];
  document.querySelector('.logo__title').textContent = langArr['headerTitle'][hash];
  headerItem[1].textContent = langArr['headerLibrary'][hash];
  document.querySelector('.footer__text').textContent = langArr['footeritem'][hash];
  firstValueList[2].textContent = langArr['choose'][hash];
  input.removeAttribute('placeholder');

  for (let key in genrelist) {
    for (const element of newList) {
      if (element.outerText === key) {
        element.textContent = genrelist[key][hash];
      }
    }
  }
  if (hash === 'pl') {
    input.setAttribute('placeholder', 'Szukaj filmu');
  } else {
    input.setAttribute('placeholder', 'Movie search');
  }
}

// Inicjalizacja języka na podstawie wartości z localStorage lub domyślnie na 'en'
let valueLn = localStorage.getItem('language');
if (!allLang.includes(valueLn)) {
  valueLn = 'en';
}
localStorage.setItem('language', valueLn);
changeLanguage();