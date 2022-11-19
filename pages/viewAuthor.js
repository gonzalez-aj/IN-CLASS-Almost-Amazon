import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();
  let domString = `
  <div class="mt-5 d-flex flex-wrap">
  <div class="d-flex flex-column">
    <h5> Author Info: ${obj.authorObject.first_name} ${obj.authorObject.last_name} ${obj.authorObject.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
    Author Email: <a href="mailto:${obj.authorObject.email}">${obj.authorObject.email}</a>
  </div>
  </div>`;

  obj.authorBooks.map((book) => {
    domString += `
  <div class="mt-5 d-flex flex-wrap">
    <div class="text-white ms-5 details">
      <h5>${book.title} ${book.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
      <p>${book.description || ''}</p>
      <hr>
      <p>${book.sale ? `<span class="badge bg-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> 
        $${book.price}` : `$${book.price}`}</p>      
    </div>
   <div class="d-flex flex-column">
     <img src=${book.image} alt=${book.title} style="width: 300px;">
     <div class="mt-5">
       <i id="edit-book-btn--${book.firebaseKey}" class="fas fa-edit btn btn-info"></i>
       <i id="delete-book--${book.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
     </div>
   </div>
  </div>`;
    return renderToDOM('#view', domString);
  });
};

export default viewAuthor;
