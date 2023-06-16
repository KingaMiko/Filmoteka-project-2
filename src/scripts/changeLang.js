import { text } from './packageLang';

const refs = {
    enLangBTN: document.getElementById('e-lang-en'),
    plLangBTN: document.getElementById('e-lang-pl'),
  };
  

function changeLanguageOnClick(lang) {
  if (text.hasOwnProperty(lang)) {
    const translations = text[lang];
    for (const key in translations) {
      if (translations.hasOwnProperty(key)) {
        const value = translations[key];
        const elements = document.querySelectorAll(key);
        elements.forEach((element) => {
          element.textContent = value;
        });
      }
    }
  }
}

refs.enLangBtn.addEventListener('click', () => {
  changeLanguageOnClick('en');
});

refs.plLangBtn.addEventListener('click', () => {
  changeLanguageOnClick('pl');
});