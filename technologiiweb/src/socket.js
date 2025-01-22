const socket = new WebSocket("ws://localhost:5000");

// Or if you used path: "/ws" above,
// const socket = new WebSocket("ws://localhost:5000/ws");

socket.onopen = () => {
  console.log("Connected to WebSocket server");
  socket.send("Hello from client!");
};

socket.onmessage = (event) => {
  console.log("Message from server:", event.data);
};
