// import tłumaczenia (json)
import { text } from './packageLang';

//przyciski, które umożliwiają użytkownikom przełączanie się między językiem angielskim i polskim
const refs = {
  enLangBTN: document.getElementById('e-lang-en'),
  plLangBTN: document.getElementById('e-lang-pl'),
};

// aktualizacja zawartości tekstowej różnych elementów na stronie na podstawie wybranego języka
// sprawdza, czy obiekt text posiada właściwość odpowiadającą wybranemu lang - jeśli tak, pobiera tłumaczenia dla tego języka
function changeLanguageOnClick(lang) {
  if (text.hasOwnProperty(lang)) {
    const translations = text[lang];

    //iterujemy po każdej parze klucz-wartość w obiekcie translations i znajdujemy wszystkie elementy na stronie, które pasują do key
    for (const key in translations) {
      if (translations.hasOwnProperty(key)) {
        const value = translations[key];
        const elements = document.querySelectorAll(key);
        elements.forEach(element => {
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
