// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
    res.render('books/details', {title: 'Add', books: book})
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
     let newBook = book({
      "title": req.body.Title,
      "price": req.body.Price,
      "author": req.body.Author,
      "genre": req.body.Genre
     });

     book.create(newBook, (err, book) => {
      res.redirect('/books');
     })
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  book.findById(id, (err, bookToEdit) => {
    res.render('/books', {title: 'Edit Book', book:bookToEdit})
  })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedBook = book({
      "_id": id,
      "title": req.body.Title,
      "price": req.body.Price,
      "author": req.body.Author,
      "genre": req.body.Genre
    });
    
    book.updateOne({_id: id}, updatedBook, (err) => {
      res.redirect('/books');
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  book.remove({_id:id}, (err) => {
    res.redirect('/books/add');
  })
});


module.exports = router;
