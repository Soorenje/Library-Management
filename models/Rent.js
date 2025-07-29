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
  if (isFreeBook.free === 1) {
    const setBookAsRented = await booksCollection.updateOne(
      { _id: new ObjectId(bookid) },
      {
        $set: {
          free: 0,
        },
      }
    );
    const userSelected = await usersCollection.findOne({
      _id: new ObjectId(userid),
    });

    await rentsCollection.insertOne({
      userid: userid,
      bookid: bookid,
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
        $set: {
          free: 1,
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

module.exports = {
  bookRentonDB,
  bookBackonDB,
};
