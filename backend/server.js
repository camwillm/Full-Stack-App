import express from "express";
import cors from "cors";

import userRoutes from "./routes/users.js";
import homeRoutes from "./routes/home.js";

//app config
const app = express();
const port = 4001;

// static files
app.use(express.static("public"));

//middleware
app.use(express.json());
app.use(cors());

// routes

app.get("/", (req, res) => {
  res.redirect("/api/home");
});
app.use("/api/users", userRoutes);
app.use("/api/home", homeRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
