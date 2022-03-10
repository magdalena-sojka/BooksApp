/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
    all: {
      booksImage: '.books-list .book__image',
    },
    class: {
      favorite: 'favorite',
    },
  };
  const templates = {
    Book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  class Books {
    constructor() {
      const thisBook = this;
      thisBook.data = dataSource.books;
      thisBook.favoriteBooks = [];
      thisBook.getElements();
      thisBook.render();
      thisBook.initActions();
      console.log('This Book: ', thisBook);
    }

    getElements() {
      const thisBook = this;
      thisBook.dom = {};
      thisBook.dom.wrapper = document.querySelector(select.containerOf.books);
    }

    render() {
      const thisBook = this;
      for (let book of dataSource.books) {
        const generatedHTML = templates.Book(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBook.dom.wrapper.appendChild(generatedDOM);
      }
    }

    initActions(){
      const thisBook = this;
      thisBook.imageBook = document.querySelectorAll(select.all.booksImage);
      console.log('thisBook.imageBook: ', thisBook.imageBook);
      for(let image of thisBook.imageBook){
        image.addEventListener('dblclick', function(event){
          event.preventDefault();
          image.classList.add(select.class.favorite);
          const bookId = image.getAttribute('data-id');
          thisBook.favoriteBooks.push(bookId);
          console.log('id Book: ', bookId);
        });

      }
    }
      
  }
  new Books();
}