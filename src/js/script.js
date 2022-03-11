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
      const bookList = document.querySelector(select.containerOf.books);
      
      bookList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const image = event.target.offsetParent;
        const bookId = image.getAttribute('data-id');
        
        if (bookList.classList.contains('.book__image')) {
          image.classList.remove(select.class.favorite);
          thisBook.favoriteBooks.splice(bookId);
        } else {
          image.classList.add(select.class.favorite);
          thisBook.favoriteBooks.push(bookId);
        }
      });
      
    }
      
  }
  new Books();
}