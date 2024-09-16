import { useState, useEffect } from "react";

export function useSensorData(searchTerm = '', searchType = '') {
  const [sensorData, setSensorData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/sensors/sensors-status?searchTerm=${searchTerm}&searchType=${searchType}`);
        const data = await response.json();
        console.log("Fetched sensor data:", data);
        setSensorData(data);
      } catch (e) {
        console.error("Error fetching sensor data:", e);
        setError(e.message);
      }
    };

    fetchData();
  }, [searchTerm, searchType]);

  return { sensorData, error };
}