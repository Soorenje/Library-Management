const { count } = require("console");
const { Connection } = require("./../db");
const { ObjectId } = require("mongodb");

const bookRentonDB = async (userid, bookid) => {
  const db = await Connection();
  const booksCollection = db.collection("books");
  const usersCollection = db.collection("users");
  const rentsCollection = db.collection("rents");

  const isFreeBook = await booksCollection.findOne({
    _id: new ObjectId(bookid),
  });
  if (isFreeBook.count >= 1) {
    const setBookAsRented = await booksCollection.updateOne(
      { _id: new ObjectId(bookid) },
      {
        $inc: {
          count: -1,
        },
      }
    );
    const userSelected = await usersCollection.findOne({
      _id: new ObjectId(userid),
    });

    await rentsCollection.insertOne({
      userid: userid,
      bookid: bookid,
      borrowedAt: new Date(Date.now()),
      returnedAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      message: `The desired book was successfully defined by user ${userSelected.username}`,
      statusCode: 200,
    };
  } else {
    return {
      message: "Book not available or already rented",
      statusCode: 400,
    };
  }
};

const bookBackonDB = async (bookId) => {
  const db = await Connection();
  const booksCollection = db.collection("books");
  const rentsCollection = db.collection("rents");
  const returnedBook = await booksCollection.findOne({
    _id: new ObjectId(bookId),
  });
  if (returnedBook) {
    await booksCollection.updateOne(
      { _id: new ObjectId(bookId) },
      {
        $inc: {
          count: +1,
        },
      }
    );
    await rentsCollection.deleteOne({ bookid: bookId });
    return {
      message: "The book has been successfully returned",
      statusCode: 200,
    };
  } else {
    return { message: "Book Not Found", statusCode: 400 };
  }
};

const applyLateFees = async () => {
  const db = await Connection();
  const rentsCollection = db.collection("rents");
  const usersCollection = db.collection("users");
  const today = new Date();
  const lateRent = await rentsCollection
    .find({
      returnedAt: { $lt: today },
    })
    .toArray();
  for (let index = 0; index < lateRent.length; index++) {
    const lateMS = Math.floor(today - lateRent[index].returnedAt);
    const daysLate = Math.floor(lateMS / (1000 * 60 * 60 * 24));
    const fee = daysLate * 10000;
    const updateCrime = await usersCollection.updateOne(
      { _id: new ObjectId(lateRent[index].userid) },
      {
        $set: {
          crime: fee,
        },
      }
    );
    console.log(updateCrime);
  }
};

module.exports = {
  bookRentonDB,
  bookBackonDB,
  applyLateFees,
};
