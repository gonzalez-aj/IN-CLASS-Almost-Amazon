import { getBooks } from '../api/bookData';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
import { showBooks } from '../pages/books';
import { getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';

const startApp = () => {
  domBuilder(); // BUILD THE DOM we need the structure of the dom built first
  domEvents(); // ADD THE EVENT LISTENTERS TO THE DOM we have to add event listeners to things already on the dom
  formEvents(); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT remember events go last
  navigationEvents(); // ATTACH THE EVENT LISTENERS TO THE NAVBAR we are only using bubbling

  // TODO: Put all books on the DOM on App load getBooks is a Promise! always .then it books is taco, it pulls the resolve
  getBooks().then((books) => showBooks(books));
  getAuthors().then((authors) => showAuthors(authors));
};

export default startApp;
