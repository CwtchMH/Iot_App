import { chartsConfig } from "@/configs";

export function createStatisticsChartsData(sensorData) {
  // Create an array of all 24 hours
  // This line creates an array of 24 hour strings, from "00" to "23"
  // Array.from creates a new array with 24 elements
  // The second argument is a mapping function that converts each index to a string
  // toString() converts the number to a string
  // padStart(2, '0') ensures each string is 2 characters long, padding with '0' if needed
  const allHours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

  // Initialize data arrays for each hour
  const lightData = new Array(24).fill(null);
  const temperatureData = new Array(24).fill(null);
  const humidityData = new Array(24).fill(null);

  // Process sensorData to extract light, temperature, and humidity values
  sensorData.forEach(reading => {
    const date = new Date(reading.createdAt);
    const hour = date.getHours();
    
    lightData[hour] = reading.light;
    temperatureData[hour] = reading.temperature;
    humidityData[hour] = reading.humidity;
  });

  const dailySalesChart = {
    type: "line",
    height: 390,
    series: [
      {
        name: "Light",
        data: lightData,
      },
      {
        name: "Temperature",
        data: temperatureData,
        color: "#ff0000",
      },
      {
        name: "Humidity",
        data: humidityData,
        color: "#ff8b00",
      }
    ],
    options: {
      ...chartsConfig,
      colors: ["#0288d1"],
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: allHours,
        title: {
          text: 'Hour of Day'
        }
      },
      yaxis: {
        title: {
          text: 'Value'
        }
      },
      tooltip: {
        x: {
          formatter: (val) => `Hour: ${val}`
        }
      }
    },
  };

  return [
    {
      color: "white",
      title: "Sensor Histogram",
      description: "#Track for the best moment",
      footer: "updated 2 sec ago",
      chart: dailySalesChart,
    }
  ];
}
