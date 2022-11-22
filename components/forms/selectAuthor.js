import { getAuthors } from '../../api/authorData';
import renderToDOM from '../../utils/renderToDom';

// THIS IS JUST THE DROP DOWN MENU

const selectAuthor = (uid, authorId) => { // you can't get the uid from author id ....
  let domString = `<label for="author">Select an Author</label>
    <select class="form-control" id="author_id" required>
    <option value="">Select an Author</option>`;

  getAuthors(uid).then((authorsArray) => { // getAuthors needs uid! its gotta get there thru
    authorsArray.forEach((author) => {
      domString += `
          <option 
            value="${author.firebaseKey}" 
            ${authorId === author.firebaseKey ? 'selected' : ''}>
              ${author.first_name} ${author.last_name}
          </option>`;
    });

    domString += '</select>';

    renderToDOM('#select-author', domString);
  });
};

export default selectAuthor;
