export function showLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('loader--visible');
  loader.classList.remove('loader--hidden');
}

export function hideLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('loader--hidden');
  loader.classList.remove('loader--visible');
}