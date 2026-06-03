const express = require("express");
const userRouters = require("./userRoutes");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello home");
});

app.post("/post", (req, res) => {
  res.send("This is a post.");
});

app.use("/users", userRouters);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
