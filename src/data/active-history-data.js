import { useEffect, useState } from "react";

export function useActiveHistoryData() {
  const [ activeHistoryData, setActiveHistoryData ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/devices/devices-status")
      const data = await response.json();
      setActiveHistoryData(data);
    };
    fetchData();
  }, []);

  return { activeHistoryData };
}
