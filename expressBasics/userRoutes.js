const express = require('express');
const {    
    getAllUsers,
    newUser,
    createUser,
    getUserController,
    searchUserController
 } = require('./userController');

const route = express.Router();

route.get("/", getAllUsers);
route.get("/new", newUser);
route.get("/search", searchUserController)
route.get("/:id", getUserController);
route.post("/", createUser);

module.exports = route;
