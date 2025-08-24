# Simple Chat System - Full Stack Demo
**By Varaprasad Prasad - Lead Engineer**

A complete real-time chat application demonstrating full-stack development skills.

## 🚀 Features

### Frontend (Vanilla JS + Socket.io)
- Real-time messaging with Socket.io
- User authentication & room management
- Typing indicators & online users
- Responsive design for mobile/desktop
- Message history & system notifications

### Backend (Node.js + Express + Socket.io)
- RESTful API for room management
- Real-time WebSocket connections
- In-memory data storage (easily replaceable with MongoDB)
- User session management
- Room-based messaging system

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Socket.io Client
- Responsive CSS Grid/Flexbox

**Backend:**
- Node.js + Express.js
- Socket.io for WebSockets
- CORS for cross-origin requests
- RESTful API design

## 📦 Installation & Setup

### 1. Install Dependencies
```bash
cd chat-backend
npm install
```

### 2. Start the Server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 3. Access the Application
- **Frontend**: http://localhost:3001
- **API**: http://localhost:3001/api/rooms
- **Health Check**: http://localhost:3001/health

## 🔧 API Endpoints

### GET /api/rooms
Get list of all chat rooms
```json
[
  {
    "id": "general",
    "name": "General Chat",
    "userCount": 5,
    "messageCount": 23
  }
]
```

### GET /api/rooms/:roomId/messages
Get message history for a room
```json
[
  {
    "id": 1640995200000,
    "userId": "socket_id",
    "username": "Varaprasad",
    "text": "Hello everyone!",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "type": "text"
  }
]
```

### POST /api/rooms
Create a new chat room
```json
{
  "name": "Project Discussion"
}
```

## 🔌 Socket Events

### Client → Server
- `join` - Join a chat room
- `send_message` - Send a message
- `typing` - Typing indicator
- `switch_room` - Change rooms

### Server → Client
- `joined_room` - Room join confirmation
- `new_message` - New message received
- `user_joined` - User joined notification
- `user_left` - User left notification
- `users_update` - Updated user list
- `user_typing` - Typing indicator

## 🏗️ Architecture

```
Frontend (HTML/JS/CSS)
    ↕ Socket.io
Backend (Node.js/Express)
    ↕ In-Memory Storage
    ↕ RESTful API
```

## 🎯 Key Features Demonstrated

### Real-time Communication
- Instant message delivery
- Live typing indicators
- User presence (online/offline)
- Room-based messaging

### Frontend Skills
- Modern JavaScript (ES6+)
- DOM manipulation
- Event handling
- Responsive design
- WebSocket client implementation

### Backend Skills
- Express.js server setup
- Socket.io WebSocket handling
- RESTful API design
- Session management
- Real-time broadcasting

### System Design
- Scalable room-based architecture
- Message persistence ready
- User session management
- Error handling & reconnection

## 🚀 Production Considerations

### Database Integration
Replace in-memory storage with MongoDB:
```javascript
// Example MongoDB integration
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: String,
  username: String,
  text: String,
  roomId: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
```

### Scaling
- Redis for session storage across multiple servers
- Load balancer for multiple Node.js instances
- Database clustering for high availability
- CDN for static assets

### Security
- JWT authentication
- Rate limiting for messages
- Input sanitization
- HTTPS/WSS in production

## 💼 Use Cases

This chat system architecture can be adapted for:
- **Customer Support** - Live chat widgets
- **Team Communication** - Internal messaging
- **Social Platforms** - User-to-user messaging
- **Gaming** - In-game chat systems
- **Education** - Classroom discussions

## 🎯 Skills Demonstrated

✅ **Full-Stack Development** - Complete frontend + backend
✅ **Real-time Systems** - WebSocket implementation
✅ **API Design** - RESTful endpoints
✅ **System Architecture** - Scalable design patterns
✅ **Frontend Skills** - Modern JavaScript, responsive design
✅ **Backend Skills** - Node.js, Express, Socket.io
✅ **Database Ready** - Easy MongoDB integration
✅ **Production Ready** - Error handling, health checks

---

**Built by Varaprasad Prasad**  
Lead Engineer | Full Stack Developer | Available for Freelance  
Portfolio: https://www.varaprasad.dev
