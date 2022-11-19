// for merged promises

// import client from '../utils/client';
import { getSingleAuthor } from './authorData';
import { getBooksByAuthor, getSingleBook } from './bookData';
// API CALLS FOR BOOKS

// const endpoint = client.databaseURL;

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
  // GET AUTHOR
  // Create an object that has book data and an object named authorObject
});

// ...spread operator in JS: https://github.com/orgs/nss-evening-web-development/discussions/6

// BONUS: use async / await for promises instead of above code
// const getBookDetails = async(firebaseKey) => { // the async keyword let's JS know this is asynchronous function (promise)
//   const bookObject = await getSingleBook(firebaseKey); // await stops the code in this function and waits for the response. This is like using .then
//   const authorObject = await getSingleAuthor(bookObject.author_id); // this function uses the data response from the bookObject

//   return { ...bookObject, authorObject };
// };

// NOTE: we only want to use async/await as used above when we have data that is dependent on another API call.
// For all else, we can use Promise.all, Promise.allSettled, etc. Why?
// Because we do not want to wait for each API call to be made if it is not necessary. This would slow down the code.

// TODO: Get data for viewAuthor
const getAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObject) => {
    getBooksByAuthor(firebaseKey)
      .then((authorBooks) => resolve({ ...authorObject, authorBooks }));
  }).catch(reject);
});

// asynch await
// const getAuthorBooks = async (firebaseKey) => {
//   const author = await getSingleAuthor(firebaseKey);
//   const authorBooks = await getBooksByAuthor(author.firebaseKey);

//   return { ...author, authorBooks };
// };
// const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
// });
// get authors books get authors books it hsould be a an array of books, an array method .map we could still .notate on it object.authorsarray.map what you want the dom string to actually give to you
// map through array aobject.booksaray.map then create html representation

// this is the delete author books relationship thingy
// const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
//   getAuthorBooks(firebaseKey).then((authorBooksArray) => {
//     const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

//     Promise.all(deleteBookPromises).then(() => {
//       deleteSingleAuthor(firebaseKey).then(resolve);
//     });
//   }).catch(reject);
// });

export {
  getBookDetails,
  getAuthorBooks
};
