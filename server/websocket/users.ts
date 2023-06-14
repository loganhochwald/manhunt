interface User {
  id: string;
  name: string;
  room: string;
}

const users: User[] = [];

const addUser = (id: string, name: string, room: string) => {
  const existingUser = users.find(
    (user) => user.name.trim().toLowerCase() === name.trim().toLowerCase()
  );

  if (existingUser) return { error: "Username has already been taken" };
  if (!name && !room) return { error: "Username and room are required" };
  if (!name) return { error: "Username is required" };
  if (!room) return { error: "Room is required" };

  const user: User = { id, name, room };
  users.push(user);
  return { user };
};

const getUser = (id: string) => {
  const user = users.find((user) => user.id === id);
  return user;
};

const deleteUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUsers = (room: string) => users.filter((user) => user.room === room);

export { addUser, getUser, deleteUser, getUsers };
