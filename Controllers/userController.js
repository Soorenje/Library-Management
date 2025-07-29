const userModel = require("./../models/User");
const url = require("url");

const getUsers = async (req, res) => {
  const users = await userModel.getAll();
  res.json(users);
};

const addUser = (req, res) => {
  let userinfos = "";

  req.on("data", (data) => {
    userinfos += data.toString();
  });

  req.on("end", async () => {
    const { name, username, email } = JSON.parse(userinfos);
    const add = await userModel.addUsersonDB(name, username, email);
    res.status(add.statusCode).json(add.message);
  });
};

const userUpgrade = async (req, res) => {
  const userId = req.params.id;
  const upgrade = await userModel.userUpgradeonDB(userId);
  res.json(upgrade);
};

const penaltyPoints = (req, res) => {
  const userId = req.params.id;

  reqBody = "";

  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", async () => {
    const { crime } = JSON.parse(reqBody);
    const penaltyAdd = await userModel.penaltyPointsonDB(userId, crime);

    res.json(penaltyAdd.message);
  });
};

const userLogin = (req, res) => {
  let user = "";

  req.on("data", (data) => {
    user += data.toString();
  });

  req.on("end", async () => {
    const { username, email } = JSON.parse(user);
    const login = await userModel.userLoginonDB(username, email);

    res.status(login.statusCode).json(login.message);
  });
};

const userEdit = (req, res) => {
  const userId = req.params.id;

  let user = "";

  req.on("data", (data) => {
    user += data.toString();
  });

  req.on("end", async () => {
    const { name, username, email } = JSON.parse(user);
    const edit = await userModel.userEditonDB(userId, name, username, email);

    res.status(edit.statusCode).json(edit.message);
  });
};

module.exports = {
  getUsers,
  addUser,
  userUpgrade,
  penaltyPoints,
  userLogin,
  userEdit,
};
