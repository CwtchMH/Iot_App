import { useState, useEffect } from "react";
import ws from "@/Websocket";

export function useSensorData(searchTerm = "", searchType = "") {
  const [sensorData, setSensorData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/sensors/sensors-status?searchTerm=${searchTerm}&searchType=${searchType}`,
      );
      const data = await response.json();
      console.log("Fetched sensor data:", data);
      setSensorData(data);
    } catch (e) {
      console.error("Error fetching sensor data:", e);
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, searchType]);

  useEffect(() => {
    // Ensure WebSocket connection is open
    if (ws.readyState !== WebSocket.OPEN) {
      ws.addEventListener('open', () => {
        console.log("WebSocket connection established");
      });
    }

    const handleWebSocketMessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);
      if (data.type === 'SENSOR_CREATE') {
        fetchData();
        console.log("Device update received, fetching new data");
      }
    };

    ws.addEventListener('message', handleWebSocketMessage);

    ws.addEventListener('error', (error) => {
      console.error("WebSocket error:", error);
      setError("WebSocket error");
    });

    return () => {
      ws.removeEventListener('message', handleWebSocketMessage);
      // Don't close the WebSocket here, as it might be used by other components
    };
  }, []);

  return { sensorData, error };
}
