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
  }
  new Books();
}