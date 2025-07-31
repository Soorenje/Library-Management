const url = require("url");
const BookModel = require("./../models/Book");
const { count } = require("console");
const { json } = require("stream/consumers");

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
  let book = "";

  req.on("data", (data) => {
    book += data.toString();
  });

  req.on("end", async () => {
    const newBook = {
      ...JSON.parse(book),
      count: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const addBooks = await BookModel.bookAddOnDB(newBook);
    res.status(201).json(addBooks.message);
  });
};

const bookEdit = (req, res) => {
  const bookId = req.params.id;

  let bookNewInfos = "";

  req.on("data", (data) => {
    bookNewInfos += data.toString();
  });

  req.on("end", async () => {
    const reqBody = JSON.parse(bookNewInfos);
    const bookEdited = await BookModel.bookEditonDB(bookId, reqBody);
    res.json(bookEdited.message);
  });
};

const bookCounts = (req , res) => {
  const bookId = req.params.id
  let body = ""
  req.on("data" , (data) => {
    body += data.toString()
  })

  req.on("end"  , async () => {
    const reqBody = JSON.parse(body)
    const addCount = await BookModel.bookCountonDB(bookId , reqBody)
    res.json(addCount.message)
  })
}

module.exports = {
  getBooks,
  deleteBook,
  addBook,
  bookEdit,
  bookCounts
};
