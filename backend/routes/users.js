import express from "express";
const Router = express.Router();
import { getUsers } from "../db/user.js";
import authenticateToken from "../middleware/authenticateToken.js";

const posts = [
  { id: 1, title: "Post 1", content: "This is post 1" },
  {
    id: 2,
    title: "Post 2",
    content: "This is post 2",
    email: "koolkid@gmail.com",
  },
  {
    id: 3,
    title: "Post 3",
    content: "This is post 3",
    email: "koolkid@gmail.com",
  },
];

Router.get("/", authenticateToken, async (req, res) => {
  res.json(posts.filter((post) => post.email === req.user.email));
});

export default Router;
