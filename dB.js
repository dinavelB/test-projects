import mysql from "mysql2";

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "binongofeb0206",
  database: "my_first-Db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default database;
