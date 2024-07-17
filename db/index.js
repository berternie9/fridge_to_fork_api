require("dotenv").config();
const pg = require("pg");

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: true,
  // },
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 30000,
});

// pool.on("connect", (client) => {
//   console.log("Connected to the database");
//   client.query("SET statement_timeout = 30000");
// });

// pool.on("error", (err, client) => {
//   console.error("Unexpected error on idle client", err);
//   process.exit(-1);
// });

module.exports = pool;
