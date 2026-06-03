const express = require("express");

const app = express();

// Express exposes all http methods for you automatically as a collable class methods
/*
* The first parameter of the method is the route, and the second parameter is the callback function that will be executed when the route is hit.
* The callback function takes two parameters, the request and the response objects.
* The request object contains information about the incoming request, such as the URL, headers, and body.
* The response object is used to send a response back to the client.
*/
app.get("/", (req, res) => {
res.send("Hello home");
})

// Honestly, you can name the request and response parameters as you want, 
// but these (req, and res) are the most common and taken as the standard ones
/*
* Let us name those parameters as r and p, and see if it works.
* Yes, it works, but it is not recommended to do so, 
* as it can cause confusion for other developers who are used to the standard naming convention.
*/
app.post("/", (r, p) => {
    p.send("This is a post.")
})


const port = 5000;

const listern = (port) =>  console.log(`Server is listerning on http://localhost:${port}`);

app.listen(port, listern(port))
