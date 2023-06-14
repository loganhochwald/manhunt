import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from 'cors';

import { addUser, getUser, deleteUser, getUsers, User } from './websocket/users';

const { sequelize } = require("./database/index");
const { Users } = require("./routes/users");

dotenv.config();

const dist = path.resolve(__dirname, '..', 'client');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const port = process.env.PORT || 3666;

app.use(cors);
app.use(express.json());
app.use(express.static(dist));
app.use(express.urlencoded({ extended: true }));

app.use('/users', Users);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(dist, 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

io.on('connection', (socket: Socket) => {
  socket.on(
    'login',
    ({ name, room }: { name: string; room: string }, callback: Function) => {
      const { user, error } = addUser(socket.id, name, room);
      if (error) {
        return callback(error);
      }
      if (user) {
        socket.join(user.room);
        socket.in(room).emit('notification', {
          title: "Someone's here",
          description: `${user.name} just entered the room`,
        });
        io.in(room).emit('users', getUsers(room));
        callback();
      }
    }
  );

  socket.on('sendMessage', (message: string) => {
    const user = getUser(socket.id);
    if (user) {
      io.in(user.room).emit('message', { user: user.name, text: message });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.room).emit('notification', {
        title: 'Someone just left',
        description: `${user.name} just left the room`,
      });
      io.in(user.room).emit('users', getUsers(user.room));
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
