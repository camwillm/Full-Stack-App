import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { checkRefreshToken, getUsers, updateTokenDB, logoutdb } from "./db/user.js";
import cookieParser from "cookie-parser";
dotenv.config();
//app config
const app = express();
const port = 4000;

// static files
app.use(express.static("public"));

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// TODO: replace refreshTokens value with db query

const ONEDAY = 24 * 60 * 60 * 1000;
// routes
app.post("/", async (req, res) => {
  // TODO: make this query the db of all users and get all their tokens and store it in this array
  const users = await getUsers();

});
// gets new access token based on the resfresh token you give it
app.post("/token", async (req, res) => {
  const refreshToken = req.cookies.jwt;
  console.log("---cookie token---",refreshToken)
  let validtoken = await checkRefreshToken(refreshToken)
  console.log("--validtoken--",validtoken)
  if (refreshToken == null)
    return res
      .status(401)
      .json({ message: "redirect to login, never got one" });
      // if the refreshtoken in the reqest/cookie is not the same as the one in the db redirect to login
  if (!validtoken)
    return res.status(403).json({ message: "redirect to login, logged out" });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "redirect to login, expired" });
    const accessToken = generateAccessToken({ email: user.email });
    res.json({ accessToken: accessToken });
  });
});

// verifys credentails and sends access token and refresh token
app.post("/login", async (req, res) => {
  console.log(req.body);

  try {
    const users = await getUsers(); // Assuming this function fetches users from a database or some source
    console.log("--users: ", users);
    const { email, password } = req.body;

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      const user = { email: email }; // Customize the payload as needed
      //ACCESS TOKEN
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      // make it update the refresh token in the db by the email
      await updateTokenDB(refreshToken, email);
      res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: ONEDAY });
      res.status(200).json({ accessToken: accessToken });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

app.delete("/logout", async (req, res) => {
  await deleteRefreshToken(req.cookies.jwt);
  res.sendStatus(204);
});

async function deleteRefreshToken(Token) {
  await logoutdb(Token);
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
