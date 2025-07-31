const userModel = require("./../models/User");


const getUsers = async (req, res) => {
  const users = await userModel.getAll();
  res.json(users);
};

const addUser = async (req, res) => {
  const { name, username, email } = req.body;
  const add = await userModel.addUsersonDB(name, username, email);
  res.status(add.statusCode).json(add.message);
};

const userUpgrade = async (req, res) => {
  const userId = req.params.id;
  const upgrade = await userModel.userUpgradeonDB(userId);
  res.json(upgrade.message);
};

const penaltyPoints = async (req, res) => {
  const userId = req.params.id;
  const { crime } = req.body;
  const penaltyAdd = await userModel.penaltyPointsonDB(userId, crime);
  res.json(penaltyAdd.message);
};

const userLogin = async (req, res) => {
  const { username, email } = req.body;
  const login = await userModel.userLoginonDB(username, email);

  res.status(login.statusCode).json(login.message);
};

const userEdit = async (req, res) => {
  const userId = req.params.id;

  const reqBody = req.body;
  const edit = await userModel.userEditonDB(userId, reqBody);

  res.status(edit.statusCode).json(edit.message);
};

module.exports = {
  getUsers,
  addUser,
  userUpgrade,
  penaltyPoints,
  userLogin,
  userEdit,
};
