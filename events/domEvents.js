import { deleteSingleAuthor, getAuthors, getSingleAuthor } from '../api/authorData';
import {
  deleteBook, getBooks, getSingleBook
} from '../api/bookData';
import { getBookDetails, getAuthorBooks } from '../api/mergedData';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import viewAuthor from '../pages/viewAuthor';
import viewBook from '../pages/viewBook';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        // console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey).then(() => {
          getBooks().then(showBooks); // we call it inside of delete book cause it needs to go in sequence ?
        }); // we don't want to erase conditioning ?
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      // console.warn('ADD BOOK');
      addBookForm();
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      // console.warn('EDIT BOOK', e.target.id);
      // console.warn(e.target.id.split('--'));
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
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
        // console.warn('DELETE AUTHOR', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteSingleAuthor(firebaseKey).then(() => {
          getAuthors().then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('ADD AUTHOR');
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
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
