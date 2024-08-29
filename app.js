const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketio(server);

// Set EJS as the view engine
app.set('view engine', 'ejs');




// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle Socket.IO connections
io.on('connection', (socket) => {
    socket.on("send-location",function(data){
      io.emit("recive-location",{id:socket.id, ...data});
    })
  console.log('A user connected');
  
  // Handle socket disconnection
  socket.on('disconnect', () => {
    io.emit("user-disconected",socket.id);
    console.log('A user disconnected');
  });
});

// Render the index view for the root route
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
