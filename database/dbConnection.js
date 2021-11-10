const { Sequelize } = require('sequelize');
import { GLOBAL } from "../constants/index";
const { database, username, password, host, port, dialect, logging } = require('./dbConfig')[GLOBAL.environment];

export const dbConnection = new Sequelize(
  database, username, password,
  {
    host, port, dialect, logging, operatorsAliases: 0,
    pool:
    {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  },
);

