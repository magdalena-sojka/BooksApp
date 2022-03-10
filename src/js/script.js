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
      booksImage: '.booksList .book__image',
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
      thisBook.getElements();
      thisBook.render();
      thisBook.initActions();

      console.log('This Book: ', thisBook);
    }

    getElements() {
      const thisBook = this;

      thisBook.dom = {};
      thisBook.dom.wrapper = document.querySelector(select.containerOf.books);
      thisBook.dom.favoriteBooks = [];
    }

    render() {
      const thisBook = this;

      for (let book of dataSource.books) {
        const generatedHTML = templates.Book(book);

        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        thisBook.dom.wrapper.appendChild(generatedDOM);
      }
    }

    /*initActions(){
      const thisBook = this;

      thisBook.imageBook = document.querySelectorAll(select.all.booksImage);

      for(let image of thisBook.imageBook){
        thisBook.imagebook.addEventListener('dblclick', function(){

          preventDefault();

          thisBook.imageBook.classList.add(select.class.favorite);

          const bookId = thisBook.data[id];

          console.log('id Book: ', bookId);
        });

      }
    }
    */  
  }
  new Books();
}