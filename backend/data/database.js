const knex = require("knex");
const config = require("../knexfile")[process.env.DB_ENV || "development"];

const db = knex(config);

module.exports = db;
