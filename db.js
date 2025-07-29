const { MongoClient } = require("mongodb");

require("dotenv").config();

const dbConnection = new MongoClient(process.env.dbConnectionURL);
const dbName = process.env.dbName;

const Connection = async () => {
  await dbConnection.connect();
  console.log("Connected To DBConnection Successfully :)");

  const db = dbConnection.db(dbName);
  return db;
};

module.exports = {
  Connection,
};
