import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { getSingleAuthor } from '../api/authorData';

const viewBook = (obj) => {
  console.warn('viewBoo obj', obj);
  clearDom();
  getSingleAuthor(obj.author_id).then((authorObject) => {
  // author_id being passed in to getSingleAuthor is essentially a relationally database because it takes a key from one table and finds values in another table using that key
  // pulling getSingleAuthor and passing author_id to it. What we should be doing is saving it as another variable.
  // save returned value of getSingleAuthor to a variable, and then use the value of that variable to access the author's first_name, last_name, email, and fave
  // what makes this suck: it's all inside of the promise return... the whole dom string is inside of the promise return
  // what can i do to make line 12 suck less and save out the value that is returned from that promise
    console.warn('authorObject', authorObject);
    const domString = `
    <div class="mt-5 d-flex flex-wrap">
     <div class="d-flex flex-column">
       <img src=${obj.image} alt=${obj.title} style="width: 300px;">
       <div class="mt-5">
         <i id="edit-book-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info"></i>
         <i id="delete-book--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
       </div>
     </div>
     <div class="text-white ms-5 details">
     <h5>${obj.title} by ${authorObject.first_name} ${authorObject.last_name} ${authorObject.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
     Author Email: <a href="mailto:${authorObject.email}">${authorObject.email}</a>
       <p>${obj.description || ''}</p>
       <hr>
       <p>${obj.sale ? `<span class="badge bg-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> 
         $${obj.price}` : `$${obj.price}`}</p>      
        </div>
      </div>`;
    renderToDOM('#view', domString);
  });
};

export default viewBook;
