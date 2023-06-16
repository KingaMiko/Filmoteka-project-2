const bodyRef = document.querySelector('body');
const toggleRef = document.querySelector('#theme-switch-toggle');
const footerDarktheme = document.querySelector('.footer');
const modalDarkTheme = document.querySelector('.modal');

const isDarkTheme = localStorage.getItem('darkTheme') === 'true';

const setTheme = darkTheme => {
  if (darkTheme) {
    bodyRef.classList.add('dark-theme');
    footerDarktheme.classList.add('dark-theme');
    modalDarkTheme.classList.add('dark-theme');
  } else {
    bodyRef.classList.remove('dark-theme');
    footerDarktheme.classList.remove('dark-theme');
    modalDarkTheme.classList.remove('dark-theme');
  }
};

setTheme(isDarkTheme);
toggleRef.checked = isDarkTheme;

toggleRef.addEventListener('change', () => {
  const darkTheme = toggleRef.checked;
  setTheme(darkTheme);
  localStorage.setItem('darkTheme', darkTheme);
});
