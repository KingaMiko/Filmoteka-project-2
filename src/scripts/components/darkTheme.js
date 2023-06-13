const bodyRef = document.querySelector('body');
const toggleRef = document.querySelector('#theme-switch-toggle');
const footerDarktheme = document.querySelector('.footer');

// Sprawdzenie, czy ustawienie motywu istnieje w localStorage
const isDarkTheme = localStorage.getItem('darkTheme') === 'true';

// Funkcja do ustawiania motywu
const setTheme = darkTheme => {
  if (darkTheme) {
    bodyRef.classList.add('dark-theme');
    footerDarktheme.classList.add('dark-theme');
  } else {
    bodyRef.classList.remove('dark-theme');
    footerDarktheme.classList.remove('dark-theme');
  }
};

// Ustawienie motywu na podstawie wartości z localStorage lub domyślnej wartości
setTheme(isDarkTheme);

// Ustawienie stanu przełącznika
toggleRef.checked = isDarkTheme;

// Obsługa zmiany motywu
toggleRef.addEventListener('change', () => {
  const darkTheme = toggleRef.checked;
  setTheme(darkTheme);

  // Zapisanie ustawienia motywu w localStorage
  localStorage.setItem('darkTheme', darkTheme);
});

export { bodyRef, toggleRef, footerDarktheme };
