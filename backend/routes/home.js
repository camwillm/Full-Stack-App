import express from "express";
const Router = express.Router();
import axios from "axios";


Router.get("/", async (req, res) => {
  res.json({ test:"test" });
});

Router.post("/", async (req, res) => {
  res.send("okay", 200);
});
export default Router;
