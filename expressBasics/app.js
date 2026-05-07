const express = require("express");
const userRouters = require('./userRoutes');
const cors = require("cors");

const app = express();

// Express exposes all http methods for you automatically as a collable class methods
app.get("/", (req, res) => {
res.send("Hello home");
})

app.post("/post", (r, p) => {
    p.send("This is a post.")
})

app.use("/users", userRouters)


const port = 5000;

const listern = (port) =>  console.log(`Server is listerning on http://localhost:${port}`);

app.listen(port, listern(port))
