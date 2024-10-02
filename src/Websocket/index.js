let ws; // Declare ws outside to maintain reference

const connectWebSocket = () => {
  ws = new WebSocket("ws://localhost:3000");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket server");
    // Attempt to reconnect after 1 second
    setTimeout(connectWebSocket, 1000);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
    // Close the connection on error to trigger reconnect
    ws.close();
  };
};

// Start the WebSocket connection
connectWebSocket();

export default ws;
