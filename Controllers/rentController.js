const rentModel = require("./../models/Rent");
const url = require("url");

const bookRent = (req, res) => {
  let reqBody = "";

  req.on("data", (data) => {
    reqBody += data.toString();
  });

  req.on("end", async () => {
    const { userid, bookid } = JSON.parse(reqBody);
    const rent = await rentModel.bookRentonDB(userid, bookid);

    res.status(rent.statusCode).json(rent.message);
  });
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
