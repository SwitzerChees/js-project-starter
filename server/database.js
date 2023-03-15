let pool = null;

const initializeMariaDB = async () => {
  const mariadb = require("mariadb");
  pool = mariadb.createPool({
    database: process.env.DB_NAME || "mychat",
    host: process.env.DB_HOST || "localhost",
    user: "root",
    password: "supersecret123",
    connectionLimit: 5,
  });
};

const executeSQL = async (query) => {
  try {
    conn = await pool.getConnection();
    const res = await conn.query(query);
    conn.end();
    return res;
  } catch (err) {
    conn.end();
    throw err;
  }
};

const initializeDBSchema = async () => {
  try {
    conn = await pool.getConnection();
    await conn.query(
      "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id));"
    );
    await conn.query(
      "CREATE TABLE IF NOT EXISTS messages (id INT NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, message VARCHAR(255) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id));"
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

module.exports = { executeSQL, initializeMariaDB, initializeDBSchema };
