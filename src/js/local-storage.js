// Pobranie listy obejrzanych filmów z local storage
function getWatchedList() {
  const watchedList = localStorage.getItem('watched');
  return watchedList ? JSON.parse(watchedList) : [];
}

// Pobranie listy filmów w kolejce z local storage
function getQueueList() {
  const queueList = localStorage.getItem('queue');
  return queueList ? JSON.parse(queueList) : [];
}

// Dodanie filmu do listy obejrzanych
function addToWatched(movie) {
  const watchedList = getWatchedList();
  watchedList.push(movie);
  localStorage.setItem('watched', JSON.stringify(watchedList));
}

// Dodanie filmu do listy kolejki
function addToQueue(movie) {
  const queueList = getQueueList();
  queueList.push(movie);
  localStorage.setItem('queue', JSON.stringify(queueList));
}

// Dodanie filmu do obejrzanych
addToWatched(movie);

// Dodanie filmu do kolejki
addToQueue(movie);
