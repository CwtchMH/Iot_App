import { useState, useEffect } from "react";

export function useActiveHistoryData(searchTerm = '', searchType = '') {
  const [activeHistoryData, setActiveHistoryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, [searchTerm, searchType]);

  return { activeHistoryData, error };
}
