import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();
export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows;
}

export async function logoutdb(token) {
  const [rows] = await pool.query(`UPDATE user SET token = '' WHERE (token = ?);`, [token]);
  return rows;
}
export async function checkRefreshToken(token) {
  const [rows] = await pool.query(`SELECT token FROM user WHERE token=?`, [token]);
  let tokenc = false
  try {
    tokenc = !!rows[0].token
  }catch{
    console.log("Error")
  }

  console.log(tokenc)
  return tokenc;
}

export async function updateTokenDB(token, email) {
  const [rows] = await pool.query(`
    UPDATE user
    SET token = ?
    WHERE email = ?;
`, [token, email]);
  console.log(rows)

  return rows;
}

export async function postUser(user) {
  let { f_name, l_name, email, password } = user;
  await pool.query(
    `
    INSERT INTO user (f_name, l_name, email, password)
    VALUES (?, ?, ?, ?)
    `,
    [f_name, l_name, email, password]
  );
}
export async function getUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);
  return rows;
}
// TODO: write query to update the refresh token in db with new token if they relogin or null if they log out
export async function updateRefreshToken(email) {
  const [rows] = await pool.query("", [email]);
  return rows;
}
