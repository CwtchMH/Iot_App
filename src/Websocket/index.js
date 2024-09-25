const ws = new WebSocket("ws://localhost:3000");

ws.onopen = () => {
  console.log("Connected to WebSocket server");
};

ws.onclose = () => {
  console.log("Disconnected from WebSocket server");
  setTimeout(ws.onopen= () => {
    console.log("Connected to WebSocket server");
  }, 5000); // Attempt to reconnect after 5 seconds
};

ws.onerror = (error) => {
  console.error("WebSocket error:", error);
  ws.close(); // Close the connection on error to trigger reconnect
};

export default ws;
