const express = require("express");
const bookController = require("./Controllers/bookController");
const rentController = require("./Controllers/rentController");
const userController = require("./Controllers/userController");
const rentModel = require("./models/Rent")

const app = express();
app.use(express.json())

app.get("/api/users", (req, res) => {
  userController.getUsers(req, res);
});

app.get("/api/books", (req, res) => {
  bookController.getBooks(req, res);
});

app.delete("/api/books/:id", (req, res) => {
  bookController.deleteBook(req, res);
});

app.post("/api/books", (req, res) => {
  bookController.addBook(req, res);
});

app.put("/api/books/backs/:id", (req, res) => {
  rentController.bookBack(req, res);
});

app.get("/api/books/rents", (req, res) => {
  rentController.bookRent(req, res);
});

app.put("/api/books/:id", (req, res) => {
  bookController.bookEdit(req, res);
});

app.post("/api/users", (req, res) => {
  userController.addUser(req, res);
});

app.put("/api/users/upgrade/:id", (req, res) => {
  userController.userUpgrade(req, res);
});

app.put("/api/users/crime/:id", (req, res) => {
  userController.penaltyPoints(req, res);
});

app.post("/api/users/login", (req, res) => {
  userController.userLogin(req, res);
});

app.put("/api/users/edit/:id", (req, res) => {
  userController.userEdit(req, res);
});

app.put("/api/books/count/:id", (req, res) => {
  bookController.bookCounts(req, res);
});

rentModel.applyLateFees() 

app.listen(8000, () => {
  console.log("Server Running On Port 8000");
});
