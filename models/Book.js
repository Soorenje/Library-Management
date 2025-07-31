// const db = require("./../db.json");
const fs = require("fs");
const { Connection } = require("./../db");
const { ObjectId } = require("mongodb");
const { title } = require("process");
const { count } = require("console");

const getAll = async () => {
  const db = await Connection();
  const booksCollection = db.collection("books");
  const books = booksCollection.find({}).toArray();
  return books;
};

const deleteOnDB = async (bookId) => {
  const db = await Connection();
  const booksCollection = db.collection("books");
  const result = await booksCollection.deleteOne({ _id: new ObjectId(bookId) });
  if (result.deletedCount) {
    return { message: "Book Removed Successfully", statusCode: 200 };
  } else {
    return { message: "Book Not Found", statusCode: 400 };
  }
};

const bookAddOnDB = async (newBook) => {
  const db = await Connection();
  const booksCollection = db.collection("books");
  const result = await booksCollection.insertOne(newBook);
  if (result.insertedId) {
    return { message: "New Book Added Successfully" };
  } else {
    return { message: "The book could not be added. Something went wrong" };
  }
};

const bookEditonDB = async (bookId, reqBody) => {
  const db = await Connection();
  const booksCollection = db.collection("books");
  const { price } = reqBody;
  const updateBook = await booksCollection.updateOne(
    { _id: new ObjectId(bookId) },
    {
      $set: {
        price: price,
      },
    }
  );
  return { message: "Book Updated Successfully" };
};

const bookCountonDB = async (bookId , reqBody) => {
  const db = await Connection()
  const booksCollection = db.collection("books")
  const {count} = reqBody
  const addCount = await booksCollection.updateOne({_id: new ObjectId(bookId)} , {
    $inc: {
      count: count
    }
  })
  return {message: "count Added Successfully"}
}

module.exports = {
  getAll,
  deleteOnDB,
  bookAddOnDB,
  bookEditonDB,
  bookCountonDB
};
