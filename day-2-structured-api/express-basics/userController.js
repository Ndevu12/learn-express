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
];

const getAllUsers = (req, res) => {
  return res.json({ users });
};

const newUser = (req, res) => {
  return res.json({ message: "Here are the lists of new users!" });
};

const createUser = (req, res) => {
  return res.json({ message: "User is created!" });
};

const getUserController = (req, res) => {
  const { id } = req.params;

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ user });
};

const searchUserController = (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(404).json({ message: "Resources not found" });
  }

  const matchedUsers = users.filter(
    (u) => u.name.toLowerCase() === name.toLowerCase()
  );

  return res.json({ users: matchedUsers });
};

module.exports = {
  getAllUsers,
  newUser,
  createUser,
  getUserController,
  searchUserController
};
