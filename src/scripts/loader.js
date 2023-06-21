export function showLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('loader');
}

export function hideLoader() {
  const loader = document.getElementById('loader');
  loader.classList.remove('loader');
}
