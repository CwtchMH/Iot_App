import { useState, useEffect, useCallback } from "react";
import ws from "@/Websocket"; // Import the WebSocket client

export function useActiveHistoryData(searchTerm = '', searchType = '') {
  const [activeHistoryData, setActiveHistoryData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/devices/devices-status?searchTerm=${searchTerm}&searchType=${searchType}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched active history data:", data);
      setActiveHistoryData(data);
    } catch (e) {
      console.error("Error fetching active history data:", e);
      setError(e.message);
    }
  },[searchTerm, searchType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      if (data.type === 'DEVICE_CREATE') {
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
  }, [fetchData]);

  return { activeHistoryData, error, setActiveHistoryData };
}
