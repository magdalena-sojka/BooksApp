/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      filters: '.filters',
    },
    all: {
      booksImage: '.books-list .book__image',
    },
    class: {
      favorite: 'favorite',
      hidden: 'hidden',
      image: 'book__image',
    },
  };
  const templates = {
    Book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  class Books {
    constructor(){
      const thisBook = this;
      thisBook.getElements();
      thisBook.render();
      thisBook.initActions();

      thisBook.data = dataSource.books;
      thisBook.favoriteBooks = [];
      thisBook.filters = [];
      //console.log('This Book: ', thisBook);
    }

    getElements(){
      const thisBook = this;
      thisBook.dom = {};
      thisBook.dom.wrapper = document.querySelector(select.containerOf.books);
    }

    render(){
      const thisBook = this;
      for (let book of dataSource.books) {
        const ratingBgc = thisBook.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;
        //console.log(ratingWidth, ratingBgc);

        const generatedHTML = templates.Book({
          name: book.name,
          price: book.price,
          id: book.id,
          image: book.image,
          rating: book.rating,
          ratingWidth: ratingWidth,
          ratingBgc: ratingBgc,
        });
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBook.dom.wrapper.appendChild(generatedDOM);
      }
    }

    initActions(){
      const thisBook = this;
      const bookList = document.querySelector(select.containerOf.books);
      
      bookList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const image = event.target.offsetParent;

        if(image.classList.contains('book__image')){
          const bookId = image.getAttribute('data-id');

          if(!image.classList.contains(select.class.favorite)){
            image.classList.add(select.class.favorite);
            thisBook.favoriteBooks.push(bookId);
          } else {
            image.classList.remove(select.class.favorite);
            thisBook.favoriteBooks.splice(bookId);
          }
        }
      });

      const filters = document.querySelector(select.containerOf.filters);

      filters.addEventListener('click', function(event){
        const clickedElement = event.target;

        if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter'){
          const value = clickedElement.value;
          console.log(clickedElement.value);
          console.log(thisBook.filters);
          if(clickedElement.checked){
            thisBook.filters.push(value);
          } else {
            const indexRemove = thisBook.filters.indexOf(value);
            thisBook.filters.splice(indexRemove, 1);
          }
        }
        thisBook.filterBooks();
      });
    }

    filterBooks(){
      const thisBook = this;
      for (let book of dataSource.books) {
        let shouldBeHidden = false;
        const filterBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        for(const filter of thisBook.filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden === true){
          filterBook.classList.add(select.class.hidden);
        } else {  
          filterBook.classList.remove(select.class.hidden);
        }
      }  
    }

    determineRatingBgc(rating){
      let background = '';
      if (rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }
  const app = new Books();
  console.log('app', app);
}