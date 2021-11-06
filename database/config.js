require('dotenv').config();

const {DB_PORT, DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT, OPS_ALIASES} = process.env;

module.exports = {
  development: {
    port: DB_PORT,
    dbName: DB_NAME,
    userName: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    dialect: DB_DIALECT,
    operatorsAliases: OPS_ALIASES,
    logging: false,
    // Configurar seeders
    seederStorage: "sequelize",
    // SeedersStoragePath: "sequelizeSeeds.json",
    seederStorageTableName: "_seeds",
    // Configurar Migraciones
    migrationStorage: "sequelize",
    migrationStorageTableName: "_migrations",  
  }
};

