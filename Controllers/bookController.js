const BookModel = require("./../models/Book");

const getBooks = async (req, res) => {
  const books = await BookModel.getAll();
  res.json(books);
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  const deleteBook = await BookModel.deleteOnDB(bookId);
  res.status(deleteBook.statusCode).json(deleteBook.message);
};

const addBook = async (req, res) => {
  const book = req.body;
  const newBook = {
    ...book,
    count: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const addBooks = await BookModel.bookAddOnDB(newBook);
  res.status(201).json(addBooks.message);
};

const bookEdit = async (req, res) => {
  const bookId = req.params.id;
  const reqBody = req.body;
  const bookEdited = await BookModel.bookEditonDB(bookId, reqBody);
  res.json(bookEdited.message);
};

const bookCounts = async (req, res) => {
  const bookId = req.params.id;
  const reqBody = req.body;
  const addCount = await BookModel.bookCountonDB(bookId, reqBody);
  res.json(addCount.message);
};

module.exports = {
  getBooks,
  deleteBook,
  addBook,
  bookEdit,
  bookCounts,
};
