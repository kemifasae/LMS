// import Validator from 'validatorjs';
import nodemailer from 'nodemailer';
import BookValidator from '../helpers/bookValidator';

require('dotenv').config();

const User = require('../models').User;
const Borrow = require('../models').Borrow;
const Fine = require('../models').Fine;
const Book = require('../models').Book;

export default class BookController {
  static create(request, response) {
    return Book
      .find({
        where: {
          title: request.body.title,
          author: request.body.author,
          genre: request.body.genre,
          pages: request.body.pages,
          copiesAvailable: request.body.copiesAvailable,
          datePublished: request.body.datePublished
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
      })
      .then((book) => {
        if (!book) {
          if (BookValidator.allowAdmin(request, response)) {
            return Book
              .create({
                title: request.body.title,
                author: request.body.author,
                genre: request.body.genre,
                pages: request.body.pages,
                copiesAvailable: request.body.copiesAvailable,
                datePublished: request.body.datePublished
              })
              .then(newBook => response.status(201).send({
                message: 'New Book Added',
                data: newBook,
              }))
              .catch(error => response.status(500).send(error.toString()));
          }
        }
        response.status(400).json({
          status: 'Exists!!',
          message: 'Entry already made!'
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  // get all recipes
  static getAllBooks(request, response) {
    Book.findAll({})
      .then((result) => {
        if (result.length === 0) {
          response.status(200).json({
            status: 'error',
            message: 'no books at all'
          });
        }
        response.status(200).json({
          status: 'Successful',
          data: result
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static getBook(request, response) {
    const bookId = parseInt(request.params.id);
    Book
      .findById(bookId)
      .then((book) => {
        if (!book) {
          return response.status(404).json({
            status: 'Unsuccessful',
            message: 'Book not found',
          });
        }
        response.status(200).json({
          status: 'Successful',
          data: book,
        });
      });
  }

  static updateBook(request, response) {
    const bookId = parseInt(request.params.id);
    Book.findById(bookId)
      .then((book) => {
        if (book) {
          if (BookValidator.allowAdmin(request, response)) {
            return book
              .update({
                title: request.body.title || book.title,
                author: request.body.author || book.author,
                genre: request.body.genre || book.genre,
                pages: request.body.pages || book.pages,
                copiesAvailable: request.body.copiesAvailable || book.copiesAvailable,
                datePublished: request.body.datePublished || book.datePublished
              })
              .then((updatedBook) => {
                delete updatedBook.dataValues.userId;
                response.status(200).send({
                  status: 'Successful',
                  data: `${book.title} has been updated`,
                });
              }).catch((error => response.status(500).send(error.toString())));
          }
        }
        response.status(404).json({
          status: 'Unsuccessful',
          message: 'Book not found',
        });
      })
      .catch((err => response.status(404).send(err.toString())));
  }

  static deleteBook(request, response) {
    const bookId = parseInt(request.params.bookId);
    Book.findById(bookId)
      .then((book) => {
        if (book) {
          if (BookValidator.allowAdmin(request, response)) {
            return book
              .destroy()
              .then(() => response.status(200).send({
                message: `${book.title} has been deleted`
              }))
              .catch(err => response.status(500).send(err.toString()));
          }
        }
        response.status(404).json({
          status: 'Unsuccessful',
          message: 'Book not found',
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static borrowBook(request, response) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.gmailName, // Your email id
        pass: process.env.gmailPass // Your password
      }
    });

    const bookId = parseInt(request.params.bookId);
    Book.findById(bookId)
      .then((book) => {
        const textbody = `Request to borrow ${book.title}`;

        User.findById(request.loggedInUser.id)
          .then((user) => {
            const mailOptions = {
              from: user.email, // sender address
              to: 'kemifasae@gmail.com', // list of receivers
              subject: 'To Borrow', // Subject line
              text: textbody // plaintext body
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                response.json({ error: err });
              } else {
                console.log(`Message sent:  ${info.response}`);
                response.json({ message: info.response });
              }
            });

            borrowRequest
              .create({
                // book details
                // user details
              })
              .then((createdRequest)=> {
                // response
              })
              .catch(error => response.status(500).send(error.toString()));
          })
          .catch(error => response.status(500).send(error.toString()));
      })
      .catch(error => response.status(500).send(error.toString()));
  }
  // static approveBorrow() {
    // delete book details from borrowRequests
  // insert details of borrowed book into borrows table
  // }
  // static searchBook() {

  // }
  // static makeRequest() {

  // }
}

