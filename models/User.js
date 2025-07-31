const { ObjectId } = require("mongodb");
const { Connection } = require("./../db");

const getAll = async () => {
  const db = await Connection();
  const usersCollection = db.collection("users");
  const users = usersCollection.find({}).toArray();
  return users;
};

const addUsersonDB = async (name, username, email) => {
  const db = await Connection();
  if (name === "" || username === "" || email === "") {
    return { message: "user data are not valid", statusCode: 422 };
  }
  const usersCollection = db.collection("users");
  const isUserExist = await usersCollection.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return { message: "user data is alredy exist", statusCode: 409 };
  } else {
    const addonDB = await usersCollection.insertOne({
      name: name,
      username: username,
      email: email,
      crime: 0,
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { message: "User Added Successfully", statusCode: 201 };
  }
};

const userUpgradeonDB = async (userId) => {
  const db = await Connection();
  const usersCollection = db.collection("users");
  await usersCollection.updateOne(
    {
      _id: new ObjectId(userId),
    },
    {
      $set: {
        role: "ADMIN",
      },
    }
  );
  return { message: "user upgraded successfully" };
};

const penaltyPointsonDB = async (userId, crime) => {
  const db = await Connection();
  const usersCollection = db.collection("users");
  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    {
      $inc: {
        crime: crime,
      },
    }
  );
  return { message: "Crime Set Successfully" };
};

const userLoginonDB = async (username, email) => {
  const db = await Connection();
  const usersCollection = db.collection("users");
  const mainUser = await usersCollection.findOne({
    username: username,
    email: email,
  });
  if (mainUser) {
    return {
      message: `Login Successfully \nusername: ${mainUser.username}  email: ${mainUser.email}`,
      statusCode: 200,
    };
  } else {
    return { message: "User Not Found", statusCode: 401 };
  }
};

const userEditonDB = async (userId, reqBody) => {
  const db = await Connection();
  const usersCollection = db.collection("users");
  const { name, username, email } = reqBody;

  const isUsernameExists = await usersCollection.findOne({
    username: username,
    _id: { $ne: new ObjectId(userId) },
  });

  if (name === "" || username === "" || email === "") {
    return {
      message: "User data is not valid. Name, username, and email are required",
      statusCode: 422,
    };
  } else if (isUsernameExists) {
    return {
      message: "The requested username is already in use",
      statusCode: 409,
    };
  } else {
    const edite = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          name: name,
          username: username,
          email: email,
        },
      }
    );
    return {
      message: "User information has been successfully updated",
      statusCode: 200,
    };
  }
};

module.exports = {
  getAll,
  addUsersonDB,
  userUpgradeonDB,
  penaltyPointsonDB,
  userLoginonDB,
  userEditonDB,
};
