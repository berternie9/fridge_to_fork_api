require("dotenv").config();
const pg = require("pg");

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  //   idleTimeoutMillis: 30000,
  //   connectionTimeoutMillis: 30000,
});

// pool.on("connect", (client) => {
//   client.query(`SET statement_timeout = 30000`);
// });

module.exports = pool;
