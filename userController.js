const users = [
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "admin"
  },
  {
    "id": 2,
    "name": "Bob Smith",
    "email": "bob@example.com",
    "role": "user"
  },
  {
    "id": 3,
    "name": "Charlie Brown",
    "email": "charlie@example.com",
    "role": "user"
  },
  {
    "id": 4,
    "name": "Diana Prince",
    "email": "diana@example.com",
    "role": "manager"
  },
  {
    "id": 5,
    "name": "Ethan Hunt",
    "email": "ethan@example.com",
    "role": "user"
  }
]
const getAllUsers = (req, res) => {
    return res.json({ users : { users}});
};

const newUser = (req, res) => {
    return res.json({ messsage : "Here are the lists of new users!"});
}

const createUser = (req, res) => {
    return res.json({ messsage : "User is created!"});
}

const getUserController = (req, res) => {
    const { id } = req.params; // const id = req.params.id;

    const user = users.find((u) => u.id = id);

    return res.json({ user : { user }});
}

const searchUserController = (req, res) => {
    const name = req.query.name;

    if (!name){
        return res.status(404).json({ Message: 'Resources not found'});
    }

    const user = users.filter((u) => u.name.toLowerCase() = name.toLowerCase());
    return res.json({ user : { user }});
}

module.exports = {
    getAllUsers,
    newUser,
    createUser,
    getUserController,
    searchUserController
}