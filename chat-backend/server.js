// Simple Chat Backend - Node.js + Socket.io
// By Varaprasad Prasad - Lead Engineer

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../chat-frontend')));

// In-memory storage (use MongoDB in production)
let rooms = new Map();
let users = new Map();

// Room structure
class ChatRoom {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.messages = [];
    this.users = new Set();
    this.createdAt = new Date();
  }

  addMessage(message) {
    this.messages.push(message);
    // Keep only last 100 messages
    if (this.messages.length > 100) {
      this.messages = this.messages.slice(-100);
    }
  }

  addUser(userId) {
    this.users.add(userId);
  }

  removeUser(userId) {
    this.users.delete(userId);
  }

  getUsers() {
    return Array.from(this.users).map(id => users.get(id)).filter(Boolean);
  }
}

// Message structure
class Message {
  constructor(userId, username, text, roomId) {
    this.id = Date.now() + Math.random();
    this.userId = userId;
    this.username = username;
    this.text = text;
    this.roomId = roomId;
    this.timestamp = new Date();
    this.type = 'text';
  }
}

// User structure
class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.joinedAt = new Date();
    this.isOnline = true;
  }
}

// Create default room
const defaultRoom = new ChatRoom('general', 'General Chat');
rooms.set('general', defaultRoom);

// API Routes
app.get('/api/rooms', (req, res) => {
  const roomList = Array.from(rooms.values()).map(room => ({
    id: room.id,
    name: room.name,
    userCount: room.users.size,
    messageCount: room.messages.length
  }));
  res.json(roomList);
});

app.get('/api/rooms/:roomId/messages', (req, res) => {
  const room = rooms.get(req.params.roomId);
  if (room) {
    res.json(room.messages.slice(-50)); // Last 50 messages
  } else {
    res.status(404).json({ error: 'Room not found' });
  }
});

app.post('/api/rooms', (req, res) => {
  const { name } = req.body;
  const roomId = name.toLowerCase().replace(/\s+/g, '-');
  
  if (!rooms.has(roomId)) {
    const room = new ChatRoom(roomId, name);
    rooms.set(roomId, room);
    res.json({ id: roomId, name });
  } else {
    res.status(400).json({ error: 'Room already exists' });
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', ({ username, roomId = 'general' }) => {
    const user = new User(socket.id, username);
    users.set(socket.id, user);

    // Join room
    socket.join(roomId);
    const room = rooms.get(roomId);
    if (room) {
      room.addUser(socket.id);
      
      // Notify room about new user
      socket.to(roomId).emit('user_joined', {
        username,
        message: `${username} joined the chat`,
        userCount: room.users.size
      });

      // Send room info to user
      socket.emit('joined_room', {
        roomId,
        roomName: room.name,
        users: room.getUsers(),
        messages: room.messages.slice(-20) // Last 20 messages
      });

      // Update user list for all users in room
      io.to(roomId).emit('users_update', room.getUsers());
    }
  });

  // Handle sending messages
  socket.on('send_message', ({ text, roomId = 'general' }) => {
    const user = users.get(socket.id);
    const room = rooms.get(roomId);

    if (user && room && room.users.has(socket.id)) {
      const message = new Message(user.id, user.username, text, roomId);
      room.addMessage(message);

      // Broadcast message to all users in room
      io.to(roomId).emit('new_message', message);
    }
  });

  // Handle typing indicators
  socket.on('typing', ({ roomId, isTyping }) => {
    const user = users.get(socket.id);
    if (user) {
      socket.to(roomId).emit('user_typing', {
        userId: user.id,
        username: user.username,
        isTyping
      });
    }
  });

  // Handle room switching
  socket.on('switch_room', ({ newRoomId, oldRoomId }) => {
    const user = users.get(socket.id);
    if (user) {
      // Leave old room
      if (oldRoomId) {
        socket.leave(oldRoomId);
        const oldRoom = rooms.get(oldRoomId);
        if (oldRoom) {
          oldRoom.removeUser(socket.id);
          socket.to(oldRoomId).emit('user_left', {
            username: user.username,
            message: `${user.username} left the chat`,
            userCount: oldRoom.users.size
          });
          io.to(oldRoomId).emit('users_update', oldRoom.getUsers());
        }
      }

      // Join new room
      socket.join(newRoomId);
      const newRoom = rooms.get(newRoomId);
      if (newRoom) {
        newRoom.addUser(socket.id);
        socket.to(newRoomId).emit('user_joined', {
          username: user.username,
          message: `${user.username} joined the chat`,
          userCount: newRoom.users.size
        });

        socket.emit('joined_room', {
          roomId: newRoomId,
          roomName: newRoom.name,
          users: newRoom.getUsers(),
          messages: newRoom.messages.slice(-20)
        });

        io.to(newRoomId).emit('users_update', newRoom.getUsers());
      }
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    const user = users.get(socket.id);
    if (user) {
      // Remove user from all rooms
      rooms.forEach((room, roomId) => {
        if (room.users.has(socket.id)) {
          room.removeUser(socket.id);
          socket.to(roomId).emit('user_left', {
            username: user.username,
            message: `${user.username} left the chat`,
            userCount: room.users.size
          });
          io.to(roomId).emit('users_update', room.getUsers());
        }
      });

      users.delete(socket.id);
    }
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../chat-frontend/index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    rooms: rooms.size,
    users: users.size 
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Chat server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔧 API: http://localhost:${PORT}/api/rooms`);
});

module.exports = { app, server, io };
