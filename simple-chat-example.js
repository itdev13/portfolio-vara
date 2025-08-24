// Simple Chat System Example - Varaprasad Prasad
// This demonstrates core chat functionality in minimal code

// 1. BASIC CHAT DATA STRUCTURE
const chatRoom = {
  id: 'room-1',
  name: 'General Chat',
  messages: [],
  users: new Set()
};

// 2. MESSAGE STRUCTURE
class Message {
  constructor(userId, text) {
    this.id = Date.now() + Math.random();
    this.userId = userId;
    this.text = text;
    this.timestamp = new Date();
    this.type = 'text'; // text, image, file, etc.
  }
}

// 3. USER STRUCTURE
class User {
  constructor(name) {
    this.id = Date.now() + Math.random();
    this.name = name;
    this.isOnline = true;
    this.lastSeen = new Date();
  }
}

// 4. CORE CHAT FUNCTIONS
class SimpleChat {
  constructor() {
    this.rooms = new Map();
    this.users = new Map();
  }

  // Join chat room
  joinRoom(userId, roomId) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.users.add(userId);
      console.log(`User ${userId} joined room ${roomId}`);
    }
  }

  // Send message
  sendMessage(userId, roomId, text) {
    const room = this.rooms.get(roomId);
    if (room && room.users.has(userId)) {
      const message = new Message(userId, text);
      room.messages.push(message);
      
      // Broadcast to all users in room
      this.broadcastMessage(roomId, message);
      return message;
    }
  }

  // Broadcast message to all users
  broadcastMessage(roomId, message) {
    const room = this.rooms.get(roomId);
    room.users.forEach(userId => {
      // In real app, this would send via WebSocket
      console.log(`Broadcasting to user ${userId}:`, message);
    });
  }

  // Get chat history
  getChatHistory(roomId, limit = 50) {
    const room = this.rooms.get(roomId);
    return room ? room.messages.slice(-limit) : [];
  }

  // Create room
  createRoom(name) {
    const room = {
      id: Date.now().toString(),
      name,
      messages: [],
      users: new Set()
    };
    this.rooms.set(room.id, room);
    return room;
  }
}

// 5. REAL-TIME WITH WEBSOCKETS (Simplified)
class ChatWebSocket {
  constructor(chat) {
    this.chat = chat;
    this.connections = new Map(); // userId -> websocket
  }

  // Handle new connection
  onConnection(userId, websocket) {
    this.connections.set(userId, websocket);
    
    websocket.on('message', (data) => {
      const { type, roomId, text } = JSON.parse(data);
      
      if (type === 'send_message') {
        const message = this.chat.sendMessage(userId, roomId, text);
        this.broadcastToRoom(roomId, {
          type: 'new_message',
          message
        });
      }
    });

    websocket.on('close', () => {
      this.connections.delete(userId);
    });
  }

  // Broadcast to all users in room
  broadcastToRoom(roomId, data) {
    const room = this.chat.rooms.get(roomId);
    if (room) {
      room.users.forEach(userId => {
        const ws = this.connections.get(userId);
        if (ws && ws.readyState === 1) { // WebSocket.OPEN
          ws.send(JSON.stringify(data));
        }
      });
    }
  }
}

// 6. USAGE EXAMPLE
function demonstrateChat() {
  console.log('=== Simple Chat System Demo ===\n');

  // Create chat system
  const chat = new SimpleChat();
  
  // Create users
  const user1 = new User('Varaprasad');
  const user2 = new User('Client');
  
  chat.users.set(user1.id, user1);
  chat.users.set(user2.id, user2);
  
  // Create room
  const room = chat.createRoom('Project Discussion');
  console.log('Created room:', room.name);
  
  // Users join room
  chat.joinRoom(user1.id, room.id);
  chat.joinRoom(user2.id, room.id);
  
  // Send messages
  chat.sendMessage(user1.id, room.id, 'Hi! I can build this chat system for you.');
  chat.sendMessage(user2.id, room.id, 'Great! What technologies would you use?');
  chat.sendMessage(user1.id, room.id, 'React frontend, Node.js backend, WebSockets for real-time, MongoDB for storage.');
  
  // Get chat history
  const history = chat.getChatHistory(room.id);
  console.log('\nChat History:');
  history.forEach(msg => {
    const user = chat.users.get(msg.userId);
    console.log(`[${msg.timestamp.toLocaleTimeString()}] ${user.name}: ${msg.text}`);
  });
}

// 7. REACT FRONTEND COMPONENT (Simplified)
const ChatComponent = `
function ChatRoom({ roomId, userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket
    const ws = new WebSocket('ws://localhost:3001');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_message') {
        setMessages(prev => [...prev, data.message]);
      }
    };
    
    setSocket(ws);
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      socket.send(JSON.stringify({
        type: 'send_message',
        roomId,
        text: newMessage
      }));
      setNewMessage('');
    }
  };

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <strong>{msg.userId}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
`;

// 8. NODE.JS BACKEND (Simplified)
const BackendCode = `
const express = require('express');
const WebSocket = require('ws');
const app = express();

const chat = new SimpleChat();
const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
  const userId = generateUserId();
  
  ws.on('message', (data) => {
    const { type, roomId, text } = JSON.parse(data);
    
    if (type === 'send_message') {
      const message = chat.sendMessage(userId, roomId, text);
      
      // Broadcast to all clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'new_message',
            message
          }));
        }
      });
    }
  });
});

app.listen(3000, () => console.log('Chat server running on port 3000'));
`;

// Run the demonstration
demonstrateChat();

// Export for use
module.exports = { SimpleChat, Message, User, ChatWebSocket };
