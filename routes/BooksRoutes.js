import express from 'express';
import { addBooks, deleteBooks, editBooks, getbookbyid, getBooks } from '../controllers/BooksController.js';
import { IsUser, allowNonReadersOnly, isAuthorOfBook } from '../middleware/verifytoken.js';

const bookroutes = express.Router();

bookroutes.post('/addbook', IsUser, allowNonReadersOnly, addBooks);
bookroutes.get('/getbook', getBooks);
bookroutes.get('/getbookbyid/:id', getbookbyid);
bookroutes.put('/editbook/:id', IsUser, isAuthorOfBook, editBooks);
bookroutes.delete('/delete/:id', IsUser, isAuthorOfBook, deleteBooks);

export default bookroutes;
