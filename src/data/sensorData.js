import { useState, useEffect } from "react";

export function useSensorData() {
  const [sensorData, setSensorData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/sensors/sensors-status")
        const data = await response.json();
        console.log("Fetched sensor data:", data);
        setSensorData(data);
      } catch (e) {
        console.error("Error fetching sensor data:", e);
        setError(e.message);
      }
    };

    fetchData();
  }, []);

  return { sensorData, error };
}