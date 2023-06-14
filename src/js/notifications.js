import 'notiflix';

// Film został dodany do kolejki
function showAddedToQueueNotification() {
  Notiflix.Notify.Success('Film został dodany do kolejki!');
}

// Brak filmu w bazie
function showMovieNotFoundNotification() {
  Notiflix.Notify.Failure('Brak filmu w bazie!');
}

// Usunięto z kolejki + modal
// Znalezlismy 625 filmow o tej nazwie
// probujesz znalezc cos co wyszukiwales
