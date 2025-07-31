const rentModel = require("./../models/Rent");


const bookRent = async (req, res) => {
  const { userid, bookid } = req.body;
  const rent = await rentModel.bookRentonDB(userid, bookid);

  res.status(rent.statusCode).json(rent.message);
};

const bookBack = async (req, res) => {
  const bookId = req.params.id;

  const bookBacked = await rentModel.bookBackonDB(bookId);

  res.status(bookBacked.statusCode).json(bookBacked.message);
};

module.exports = {
  bookRent,
  bookBack,
};
