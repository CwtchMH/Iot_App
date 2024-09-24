const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
};

export default ws;