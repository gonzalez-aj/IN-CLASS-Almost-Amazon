import { getAuthors, getSingleAuthor } from '../api/authorData';
import {
  deleteBook, getBooks, getSingleBook
} from '../api/bookData';
import { getBookDetails, getAuthorBooks, deleteAuthorBooksRelationship } from '../api/mergedData';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import viewAuthor from '../pages/viewAuthor';
import viewBook from '../pages/viewBook';

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        // console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey).then(() => {
          getBooks(user.uid).then(showBooks); // we call it inside of delete book cause it needs to go in sequence ?
        }); // we don't want to erase conditioning ?
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      // console.warn('ADD BOOK');
      addBookForm(user.uid);
    }

    // TODO: CLICK EVENT EDITING A BOOK
    if (e.target.id.includes('edit-book-btn')) { // lives in books.js item.firebaseKey
      // console.warn('EDIT BOOK', e.target.id);
      // console.warn(e.target.id.split('--'));
      const [, firebaseKey] = e.target.id.split('--'); // if this is problem

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(user.uid, bookObj)); // it is expecting as the first parameter, the userid, but im passing it the whole object
      // get single book param in api bookData.js
      // getSingleBook(firebaseKey).then(addBookForm); // using the callback method ?
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS green button
    if (e.target.id.includes('view-book-btn')) {
      // console.warn('VIEW BOOK', e.target.id);
      // console.warn(e.target.id.split('--'));
      // console.warn(viewBook);
      const [, firebaseKey] = e.target.id.split('--'); // destructuring

      // getBookInfo(firebaseKey).then(viewBook);
      // viewbook is the promise return that is passed in to get single author as obj
      // console.warn('viewbook author id', viewBook.author_id);
      // getSingleAuthor(obj.author_id).then((authorObject)
      getBookDetails(firebaseKey).then(viewBook);
    }

    // CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');

        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors(user.uid).then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR btn blue
    if (e.target.id.includes('edit-author-btn')) {
      // console.warn('EDIT AUTHOR', e.target.id);
      // console.warn(e.target.id.split('--'));
      const [, firebaseKey] = e.target.id.split('--');
      // console.warn('>>blah>>', firebaseKey);
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
      // getSingleAuthor(firebaseKey).then(addAuthorForm); // using the callback method
    }
    // CLICK EVENT FOR VIEW AUTHOR DETAILS green button
    if (e.target.id.includes('view-author-btn')) {
      // console.warn('VIEW AUTHOR', e.target.id);
      // console.warn(e.target.id.split('--'));
      const [, firebaseKey] = e.target.id.split('--'); // destructuring

      getAuthorBooks(firebaseKey).then(viewAuthor);
    }
  });
};

export default domEvents;
