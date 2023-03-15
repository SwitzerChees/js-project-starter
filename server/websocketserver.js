const WebSocket = require("ws");

// Intiiate the websocket server
const initializeWebsocketServer = (server) => {
  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
};

// If a new connection is established, the onConnection function is called
const onConnection = (ws) => {
  console.log("New websocket connection");
  ws.on("message", (message) => onMessage(ws, message));
};

// If a new message is received, the onMessage function is called
const onMessage = (ws, message) => {
  console.log("Message received: " + message);
  ws.send("Hello, you sent -> " + message);
};

module.exports = { initializeWebsocketServer };