import 'notiflix';

// Film został dodany do kolejki
function showAddedToQueueNotification() {
  Notiflix.Notify.Success('The video has been added to the queue!');
}

// Brak filmu w bazie
function showMovieNotFoundNotification() {
  Notiflix.Notify.Failure('No movie in database!');
}

// Usunięto z kolejki + modal
// Znalezlismy 625 filmow o tej nazwie
// probujesz znalezc cos co wyszukiwales
